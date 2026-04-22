import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop — scrolls the window to the top whenever the route changes.
 * Place this once inside the Router in App.tsx.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  return null;
}
