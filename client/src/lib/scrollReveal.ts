const WAIT = 'reveal-wait';
const IN = 'is-in';

function eligible(section: HTMLElement) {
  if (section.id === 'home') return false;
  if (section.closest('#home')) return false;
  if (section.classList.contains('pt-20') || section.classList.contains('pt-24') || section.classList.contains('pt-28') || section.classList.contains('pt-32')) return false;
  return true;
}

export function installScrollReveal() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const seen = new WeakSet<Element>();
  let observer: IntersectionObserver | null = null;

  const watch = (section: HTMLElement) => {
    if (seen.has(section) || section.classList.contains(IN)) return;
    if (!eligible(section)) return;
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.9) return;
    seen.add(section);
    section.classList.add(WAIT);
    observer?.observe(section);
  };

  const scan = () => {
    document.querySelectorAll<HTMLElement>('section').forEach(watch);
  };

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(IN);
        observer?.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  scan();
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      scan();
    });
  };
  const mutations = new MutationObserver(schedule);
  mutations.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('popstate', schedule);
}
