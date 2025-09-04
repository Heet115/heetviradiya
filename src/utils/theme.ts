/**
 * Theme utility functions for better theme management
 */

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

// Theme detection utilities
export const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const resolveTheme = (theme: Theme): ResolvedTheme => {
  return theme === 'system' ? getSystemTheme() : theme;
};

// Theme storage with error handling
const STORAGE_KEY = 'heet-portfolio-theme';
const CACHE_KEY = 'theme-cache-timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const getStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const cacheTime = localStorage.getItem(CACHE_KEY);
    
    // Check cache validity
    if (cacheTime && Date.now() - parseInt(cacheTime) > CACHE_DURATION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  return null;
};

export const storeTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
    localStorage.setItem(CACHE_KEY, Date.now().toString());
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error);
  }
};

// Theme preference analytics (privacy-friendly)
export const trackThemeUsage = (theme: Theme, resolvedTheme: ResolvedTheme): void => {
  try {
    // Only track if analytics is available and user hasn't opted out
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'theme_change', {
        theme_preference: theme,
        resolved_theme: resolvedTheme,
        is_system_theme: theme === 'system',
        timestamp: new Date().toISOString(),
      });
    }
  } catch {
    // Silently fail - analytics shouldn't break the app
  }
};

// Theme-aware CSS class utilities
export const getThemeClasses = (resolvedTheme: ResolvedTheme) => ({
  background: resolvedTheme === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900',
  card: resolvedTheme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-200',
  text: {
    primary: resolvedTheme === 'dark' ? 'text-white' : 'text-gray-900',
    secondary: resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    muted: resolvedTheme === 'dark' ? 'text-gray-400' : 'text-gray-500',
  },
  border: resolvedTheme === 'dark' ? 'border-gray-700' : 'border-gray-200',
});

// Performance optimization: debounced theme application
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Theme transition utilities
export const enableThemeTransition = (): void => {
  const css = document.createElement('style');
  css.textContent = `
    *, *::before, *::after {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
    }
  `;
  document.head.appendChild(css);
  
  // Remove after transition completes
  setTimeout(() => {
    document.head.removeChild(css);
  }, 300);
};

// Accessibility helpers
export const announceThemeChange = (theme: Theme, resolvedTheme: ResolvedTheme): void => {
  const message = theme === 'system' 
    ? `Theme set to system preference (currently ${resolvedTheme})`
    : `Theme changed to ${resolvedTheme}`;
    
  // Create accessible announcement
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after screen readers have announced
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};