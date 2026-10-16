export type QuickViewOption = {
  id: string;
  title: string;
  amount: string;
  currency: string;
  available: boolean;
};

export type QuickViewPayload = {
  href: string;
  title: string;
  description?: string;
  image: string;
  alt: string;
  productId: string;
  handle: string;
  options: QuickViewOption[];
};

type QuickViewState = {
  payload: QuickViewPayload | null;
  origin: { x: number; y: number } | null;
};

let state: QuickViewState = { payload: null, origin: null };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getQuickView(): QuickViewState {
  return state;
}

export function subscribeQuickView(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function openQuickView(payload: QuickViewPayload, origin: { x: number; y: number }) {
  state = { payload, origin };
  emit();
}

export function closeQuickView() {
  if (!state.payload) return;
  state = { payload: null, origin: null };
  emit();
}
