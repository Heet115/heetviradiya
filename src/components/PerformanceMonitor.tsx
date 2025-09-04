import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Web Vitals monitoring
    const reportWebVitals = (_metric: any) => {
      // In production, send to analytics
      // Metric data available for analytics service
    };

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        reportWebVitals({
          name: 'LCP',
          value: lastEntry.startTime,
          rating: lastEntry.startTime > 2500 ? 'poor' : lastEntry.startTime > 1200 ? 'needs-improvement' : 'good'
        });
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Browser doesn't support LCP
      }
    };

    // First Input Delay (FID)
    const observeFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          reportWebVitals({
            name: 'FID',
            value: fid,
            rating: fid > 300 ? 'poor' : fid > 100 ? 'needs-improvement' : 'good'
          });
        });
      });
      
      try {
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Browser doesn't support FID
      }
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        reportWebVitals({
          name: 'CLS',
          value: clsValue,
          rating: clsValue > 0.25 ? 'poor' : clsValue > 0.1 ? 'needs-improvement' : 'good'
        });
      });
      
      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Browser doesn't support CLS
      }
    };

    // Initialize observers
    observeLCP();
    observeFID();
    observeCLS();

    // Resource timing
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        reportWebVitals({
          name: 'TTFB',
          value: navigation.responseStart - navigation.requestStart,
          rating: navigation.responseStart - navigation.requestStart > 600 ? 'poor' : 'good'
        });
      }
    });

  }, []);

  return null;
};

export default PerformanceMonitor;