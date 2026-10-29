import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

const GA_MEASUREMENT_ID = 'G-BJH1BXTH78';

type Gtag = (command: 'event', eventName: string, params?: Record<string, string>) => void;

export function AnalyticsPageViews() {
  const [location] = useLocation();
  const lastPath = useRef('');

  useEffect(() => {
    const pagePath = `${location}${window.location.search}`;
    if (lastPath.current === pagePath) return;
    lastPath.current = pagePath;
    const gtag = (window as Window & { gtag?: Gtag }).gtag;
    if (typeof gtag !== 'function') return;
    gtag('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
