import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { useCartStore } from '@/stores/cartStore';
import { closeQuickView, getQuickView, subscribeQuickView } from '@/lib/quickView';

function sizeLabel(title: string) {
  return title === 'Default Title' ? 'Standard' : title;
}

export function QuickView() {
  const { payload, origin } = useSyncExternalStore(subscribeQuickView, getQuickView, getQuickView);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openClass, setOpenClass] = useState(false);
  const [optionId, setOptionId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  useEffect(() => {
    setOptionId(payload?.options.find((option) => option.available)?.id || payload?.options[0]?.id || null);
  }, [payload]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (payload && !dialog.open) {
      setOpenClass(false);
      dialog.showModal();
      const frame = window.requestAnimationFrame(() => setOpenClass(true));
      return () => window.cancelAnimationFrame(frame);
    }
    if (!payload && dialog.open) {
      setOpenClass(false);
      dialog.close();
    }
  }, [payload]);

  if (typeof document === 'undefined') return null;

  const selected = payload?.options.find((option) => option.id === optionId) || payload?.options[0];
  const price = selected ? `$${Number(selected.amount).toFixed(2)}` : '';
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dx = !reduce && origin ? origin.x - window.innerWidth / 2 : 0;
  const dy = !reduce && origin ? origin.y - window.innerHeight / 2 : 0;

  const add = () => {
    if (!payload || !selected || !selected.available) return;
    addItem({
      variantId: selected.id,
      productId: payload.productId,
      title: payload.title,
      variantTitle: selected.title,
      price: { amount: selected.amount, currencyCode: selected.currency },
      quantity: 1,
      image: payload.image,
      handle: payload.handle,
    });
    toast.success(`${payload.title} added to cart`);
    closeQuickView();
    setCartOpen(true);
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`quick-view${openClass ? ' is-open' : ''}`}
      aria-labelledby="quick-view-title"
      style={{ ['--dx' as string]: `${dx}px`, ['--dy' as string]: `${dy}px` }}
      onCancel={(event) => {
        event.preventDefault();
        closeQuickView();
      }}
      onMouseDown={(event) => {
        if (event.target === dialogRef.current) closeQuickView();
      }}
    >
      {payload ? (
        <div className="quick-view-sheet">
          <div className="quick-view-photo">
            <img src={payload.image} alt={payload.alt} width={480} height={480} />
          </div>
          <div className="quick-view-copy">
            <p className="hero-kicker">Quick view</p>
            <h2 id="quick-view-title">{payload.title}</h2>
            {payload.description ? <p className="quick-view-desc">{payload.description}</p> : null}
            {payload.options.length > 0 ? (
              <div className="quick-view-sizes" role="group" aria-label="Size">
                {payload.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={option.id === selected?.id}
                    disabled={!option.available}
                    onClick={() => setOptionId(option.id)}
                  >
                    {sizeLabel(option.title)}
                  </button>
                ))}
              </div>
            ) : null}
            {price ? <p className="quick-view-price">{price} {selected?.currency || 'USD'}</p> : null}
            <div className="quick-view-actions">
              <button type="button" className="btn-primary" onClick={add} disabled={!selected?.available}>
                {selected?.available ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <Link href={payload.href} className="btn-text" onClick={() => closeQuickView()}>
                Full details
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>,
    document.body,
  );
}
