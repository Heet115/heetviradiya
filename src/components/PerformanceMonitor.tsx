import { useEffect } from 'react';
import { trackEvent } from './GoogleAnalytics';

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Core Web Vitals monitoring
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            const lcp = lastEntry.startTime;
            
            // Track LCP
            trackEvent('web_vitals', 'LCP', 'performance', Math.round(lcp));
            
            // Log performance data
            console.log('LCP:', Math.round(lcp), 'ms');
          });
          
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
          console.warn('LCP observer not supported');
        }

        // First Input Delay (FID)
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              const fid = entry.processingStart - entry.startTime;
              
              // Track FID
              trackEvent('web_vitals', 'FID', 'performance', Math.round(fid));
              
              console.log('FID:', Math.round(fid), 'ms');
            });
          });
          
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (error) {
          console.warn('FID observer not supported');
        }

        // Cumulative Layout Shift (CLS)
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            
            // Track CLS
            trackEvent('web_vitals', 'CLS', 'performance', Math.round(clsValue * 1000));
            
            console.log('CLS:', clsValue.toFixed(4));
          });
          
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.warn('CLS observer not supported');
        }
      }
    };

    // Page load performance
    const measurePageLoad = () => {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (perfData) {
            const metrics = {
              dns: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
              tcp: Math.round(perfData.connectEnd - perfData.connectStart),
              ssl: perfData.secureConnectionStart > 0 ? Math.round(perfData.connectEnd - perfData.secureConnectionStart) : 0,
              ttfb: Math.round(perfData.responseStart - perfData.requestStart),
              download: Math.round(perfData.responseEnd - perfData.responseStart),
              domParse: Math.round(perfData.domContentLoadedEventEnd - perfData.responseEnd),
              domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
              pageLoad: Math.round(perfData.loadEventEnd - perfData.fetchStart),
            };

            // Track key metrics
            trackEvent('performance', 'TTFB', 'page_load', metrics.ttfb);
            trackEvent('performance', 'DOM_Ready', 'page_load', metrics.domReady);
            trackEvent('performance', 'Page_Load', 'page_load', metrics.pageLoad);

            console.log('Performance Metrics:', metrics);
          }
        }, 0);
      });
    };

    // Resource loading performance
    const measureResourceLoad = () => {
      window.addEventListener('load', () => {
        const resources = performance.getEntriesByType('resource');
        
        const resourceMetrics = {
          totalResources: resources.length,
          totalSize: 0,
          slowResources: 0,
        };

        resources.forEach((resource: any) => {
          if (resource.transferSize) {
            resourceMetrics.totalSize += resource.transferSize;
          }
          
          const loadTime = resource.responseEnd - resource.startTime;
          if (loadTime > 1000) { // Resources taking more than 1 second
            resourceMetrics.slowResources++;
          }
        });

        // Track resource metrics
        trackEvent('performance', 'Total_Resources', 'resource_load', resourceMetrics.totalResources);
        trackEvent('performance', 'Total_Size', 'resource_load', Math.round(resourceMetrics.totalSize / 1024)); // KB
        trackEvent('performance', 'Slow_Resources', 'resource_load', resourceMetrics.slowResources);

        console.log('Resource Metrics:', resourceMetrics);
      });
    };

    // Memory usage monitoring
    const measureMemoryUsage = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        
        const memoryMetrics = {
          usedJSHeapSize: Math.round(memInfo.usedJSHeapSize / 1048576), // MB
          totalJSHeapSize: Math.round(memInfo.totalJSHeapSize / 1048576), // MB
          jsHeapSizeLimit: Math.round(memInfo.jsHeapSizeLimit / 1048576), // MB
        };

        // Track memory usage
        trackEvent('performance', 'Memory_Used', 'memory', memoryMetrics.usedJSHeapSize);
        
        console.log('Memory Usage:', memoryMetrics);
      }
    };

    // Connection quality monitoring
    const measureConnectionQuality = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        
        if (connection) {
          const connectionInfo = {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData,
          };

          // Track connection quality
          trackEvent('performance', 'Connection_Type', 'network', undefined);
          trackEvent('performance', 'Downlink', 'network', Math.round(connection.downlink));
          trackEvent('performance', 'RTT', 'network', connection.rtt);

          console.log('Connection Info:', connectionInfo);
        }
      }
    };

    // User engagement tracking
    const trackUserEngagement = () => {
      let startTime = Date.now();
      let isVisible = true;

      const handleVisibilityChange = () => {
        if (document.hidden) {
          if (isVisible) {
            const engagementTime = Date.now() - startTime;
            trackEvent('engagement', 'Time_On_Page', 'user_behavior', Math.round(engagementTime / 1000));
            isVisible = false;
          }
        } else {
          startTime = Date.now();
          isVisible = true;
        }
      };

      const handleBeforeUnload = () => {
        if (isVisible) {
          const engagementTime = Date.now() - startTime;
          trackEvent('engagement', 'Session_Duration', 'user_behavior', Math.round(engagementTime / 1000));
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    };

    // Initialize all monitoring
    observeWebVitals();
    measurePageLoad();
    measureResourceLoad();
    measureMemoryUsage();
    measureConnectionQuality();
    const cleanupEngagement = trackUserEngagement();

    // Periodic memory monitoring
    const memoryInterval = setInterval(measureMemoryUsage, 30000); // Every 30 seconds

    // Cleanup
    return () => {
      clearInterval(memoryInterval);
      if (cleanupEngagement) {
        cleanupEngagement();
      }
    };
  }, []);

  return null;
};

export default PerformanceMonitor;