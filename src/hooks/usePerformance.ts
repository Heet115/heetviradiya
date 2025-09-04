import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Performance monitoring
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance metrics for debugging
          if (entry.entryType === 'navigation') {
            // Navigation timing data available for analytics
          }
          
          if (entry.entryType === 'largest-contentful-paint') {
            // LCP data available for analytics
          }
          
          if (entry.entryType === 'first-input') {
            // FID data available for analytics
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