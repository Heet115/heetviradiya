import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  trackingId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ trackingId }) => {
  useEffect(() => {
    // Only load in production and if tracking ID is provided
    if (process.env.NODE_ENV !== 'production' || !trackingId) {
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);

    // Track page views
    const trackPageView = (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', trackingId, {
          page_path: url,
        });
      }
    };

    // Track initial page view
    trackPageView(window.location.pathname);

    // Track navigation changes (for SPA)
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [trackingId]);

  return null;
};

// Utility functions for tracking events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

export const trackUserEngagement = (engagementTime: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'user_engagement', {
      engagement_time_msec: engagementTime,
    });
  }
};

export const trackDownload = (fileName: string) => {
  trackEvent('download', 'file', fileName);
};

export const trackExternalLink = (url: string) => {
  trackEvent('click', 'external_link', url);
};

export const trackProjectView = (projectId: string, projectTitle: string) => {
  trackEvent('view_item', 'project', projectTitle, undefined);
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_item', {
      item_id: projectId,
      item_name: projectTitle,
      item_category: 'project',
    });
  }
};

export const trackContactForm = (method: string) => {
  trackEvent('contact', 'form_submission', method);
};

export default GoogleAnalytics;