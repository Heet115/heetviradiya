import { useEffect } from 'react';
import { SEOData } from '@/utils/seo';

export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // Update document title
    document.title = seoData.title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    if (seoData.author) updateMetaTag('author', seoData.author);

    // Open Graph tags
    updateMetaTag('og:title', seoData.title, true);
    updateMetaTag('og:description', seoData.description, true);
    if (seoData.image) updateMetaTag('og:image', seoData.image, true);
    if (seoData.url) updateMetaTag('og:url', seoData.url, true);
    if (seoData.type) updateMetaTag('og:type', seoData.type, true);

    // Twitter tags
    updateMetaTag('twitter:title', seoData.title, true);
    updateMetaTag('twitter:description', seoData.description, true);
    if (seoData.image) updateMetaTag('twitter:image', seoData.image, true);
    if (seoData.url) updateMetaTag('twitter:url', seoData.url, true);

    // Article specific tags
    if (seoData.publishedTime) {
      updateMetaTag('article:published_time', seoData.publishedTime, true);
    }
    if (seoData.modifiedTime) {
      updateMetaTag('article:modified_time', seoData.modifiedTime, true);
    }
    if (seoData.section) {
      updateMetaTag('article:section', seoData.section, true);
    }
    if (seoData.author) {
      updateMetaTag('article:author', seoData.author, true);
    }

    // Tags
    if (seoData.tags && seoData.tags.length > 0) {
      // Remove existing article:tag meta tags
      const existingTags = document.querySelectorAll('meta[property="article:tag"]');
      existingTags.forEach(tag => tag.remove());

      // Add new tags
      seoData.tags.forEach(tag => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }

    // Update canonical URL
    if (seoData.url) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', seoData.url);
    }

    // Add structured data if provided
    if (seoData.type === 'article' && seoData.url) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": seoData.title,
        "description": seoData.description,
        "image": seoData.image,
        "url": seoData.url,
        "datePublished": seoData.publishedTime,
        "dateModified": seoData.modifiedTime || seoData.publishedTime,
        "author": {
          "@type": "Person",
          "name": seoData.author || "Heet Viradiya"
        },
        "publisher": {
          "@type": "Person",
          "name": "Heet Viradiya"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": seoData.url
        }
      };

      // Remove existing structured data for articles
      const existingStructuredData = document.querySelector('script[type="application/ld+json"][data-type="article"]');
      if (existingStructuredData) {
        existingStructuredData.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-type', 'article');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Remove dynamically added article tags
      const articleTags = document.querySelectorAll('meta[property="article:tag"]');
      articleTags.forEach(tag => tag.remove());

      // Remove article structured data
      const articleStructuredData = document.querySelector('script[type="application/ld+json"][data-type="article"]');
      if (articleStructuredData) {
        articleStructuredData.remove();
      }
    };
  }, [seoData]);
};

export default useSEO;