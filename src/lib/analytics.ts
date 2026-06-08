declare global {
  interface Window {
    gtag: (command: string, eventName: string, params?: object) => void;
    dataLayer: any[];
    adsbygoogle: any[];
  }
}

export const trackClick = (elementName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', { element: elementName });
  }
};

export const trackPageView = (pagePath: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', { page_path: pagePath });
  }
};

export const trackScroll = (percent: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', { percent });
  }
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
