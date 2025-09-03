import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  systemTheme: ResolvedTheme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme storage utilities with better error handling
const THEME_STORAGE_KEY = 'heet-portfolio-theme';
const THEME_CACHE_KEY = 'theme-cache-timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const getStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const cacheTime = localStorage.getItem(THEME_CACHE_KEY);
    
    // Check if cache is still valid
    if (cacheTime && Date.now() - parseInt(cacheTime) > CACHE_DURATION) {
      localStorage.removeItem(THEME_STORAGE_KEY);
      localStorage.removeItem(THEME_CACHE_KEY);
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

const storeTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem(THEME_CACHE_KEY, Date.now().toString());
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error);
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Initialize with stored theme or system preference
    const stored = getStoredTheme();
    return stored || 'system';
  });
  
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => {
    // Initialize system theme detection
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Memoized system theme detection
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Memoized theme resolution
  const resolvedTheme = useMemo((): ResolvedTheme => {
    return theme === 'system' ? systemTheme : theme;
  }, [theme, systemTheme]);

  // Check if current theme is system
  const isSystemTheme = useMemo(() => theme === 'system', [theme]);

  // Apply theme to DOM with performance optimization
  const applyThemeToDOM = useCallback((themeToApply: ResolvedTheme) => {
    const root = document.documentElement;
    
    // Use requestAnimationFrame for smooth transitions
    requestAnimationFrame(() => {
      if (themeToApply === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
        // Set meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', '#1f2937');
        }
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        // Set meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', '#ffffff');
        }
      }
    });
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    // Set initial system theme
    setSystemTheme(getSystemTheme());
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [getSystemTheme]);

  // Apply theme changes to DOM
  useEffect(() => {
    applyThemeToDOM(resolvedTheme);
  }, [resolvedTheme, applyThemeToDOM]);

  // Store theme preference when it changes
  useEffect(() => {
    storeTheme(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Dispatch custom event for other parts of the app
    window.dispatchEvent(new CustomEvent('themeChange', { 
      detail: { theme: newTheme, resolvedTheme: newTheme === 'system' ? systemTheme : newTheme }
    }));
  }, [systemTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'system';
        case 'system':
          return 'light';
        default:
          return 'light';
      }
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isSystemTheme,
    systemTheme,
  }), [theme, resolvedTheme, setTheme, toggleTheme, isSystemTheme, systemTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};