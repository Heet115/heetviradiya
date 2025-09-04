// Resource preloader for critical assets
export const preloadCriticalResources = () => {
  // Only preload if connection is fast enough
  if ('connection' in navigator && (navigator as any).connection.effectiveType === 'slow-2g') {
    return;
  }

  // Preload critical images only if they exist
  const criticalImages = ['/logo.png', '/og-image.jpg'];
  
  criticalImages.forEach(src => {
    // Check if image exists before preloading
    const img = new Image();
    img.onload = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    };
    img.src = src;
  });

  // Preload critical font subset only
  if (!document.querySelector('link[href*="fonts.gstatic.com"]')) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
    document.head.appendChild(fontLink);
  }
};

// Lazy load non-critical resources
export const lazyLoadResources = () => {
  // Lazy load images with intersection observer
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
};

// Prefetch next page resources
export const prefetchNextPageResources = (page: 'home' | 'projects') => {
  const resources = page === 'home' 
    ? ['/src/components/ProjectsPage.tsx']
    : ['/src/components/About.tsx', '/src/components/Skills.tsx'];

  resources.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
};