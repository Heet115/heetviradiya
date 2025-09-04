import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Performance monitoring
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance metrics for debugging
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('Navigation timing:', {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
              firstPaint: navEntry.responseEnd - navEntry.requestStart,
            });
          }
          
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          
          if (entry.entryType === 'first-input') {
            console.log('FID:', (entry as PerformanceEventTiming).processingStart - entry.startTime);
          }
        }
      });

      // Observe different performance metrics
      try {
        observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input'] });
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        observer.observe({ entryTypes: ['navigation'] });
      }

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    // Optimize images loading
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));

      return () => imageObserver.disconnect();
    }
  }, []);
};