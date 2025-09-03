import { useContext, useEffect, useState, useCallback } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook for components that need to react to theme changes
export const useThemeListener = (callback: (theme: string, resolvedTheme: string) => void) => {
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      callback(event.detail.theme, event.detail.resolvedTheme);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, [callback]);
};

// Hook for getting theme-aware CSS classes
export const useThemeClasses = () => {
  const { resolvedTheme } = useTheme();
  
  return useCallback((lightClass: string, darkClass: string) => {
    return resolvedTheme === 'dark' ? darkClass : lightClass;
  }, [resolvedTheme]);
};

// Hook for theme-aware media queries
export const useThemeMediaQuery = () => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return matches;
};