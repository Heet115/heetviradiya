import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Sun, Moon, Monitor, ChevronDown, Check, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

interface ThemeSelectorProps {
  onOpenPreferences?: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onOpenPreferences }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, resolvedTheme, setTheme, isSystemTheme, systemTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeOptions = useMemo(() => [
    { 
      value: 'light' as const, 
      label: 'Light', 
      icon: Sun,
      description: 'Always use light theme'
    },
    { 
      value: 'dark' as const, 
      label: 'Dark', 
      icon: Moon,
      description: 'Always use dark theme'
    },
    { 
      value: 'system' as const, 
      label: 'System', 
      icon: Monitor,
      description: 'Follow system preference'
    },
  ], []);

  const currentTheme = useMemo(() => 
    themeOptions.find(option => option.value === theme), 
    [themeOptions, theme]
  );

  // Handle click outside with better performance
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  const handleThemeSelect = useCallback((selectedTheme: typeof theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
    
    // Provide haptic feedback on mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }, [setTheme]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openPreferences = useCallback(() => {
    setIsOpen(false);
    onOpenPreferences?.();
  }, [onOpenPreferences]);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-800/50 transition-all duration-300 shadow-md hover:shadow-sky-500/25 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        title={`Theme: ${currentTheme?.label}${isSystemTheme ? ` (${resolvedTheme})` : ''} - ${currentTheme?.description}`}
        aria-label="Theme selector"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {currentTheme && <currentTheme.icon size={18} />}
        <span className="hidden sm:inline text-sm font-medium">{currentTheme?.label}</span>
        {isSystemTheme && (
          <span className="hidden md:inline text-xs text-sky-500 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/50 px-1.5 py-0.5 rounded">
            {resolvedTheme}
          </span>
        )}
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 backdrop-blur-sm"
            role="listbox"
            aria-label="Theme options"
          >
            {themeOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = option.value === theme;
              const showSystemStatus = option.value === 'system';
              
              return (
                <motion.button
                  key={option.value}
                  whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
                  onClick={() => handleThemeSelect(option.value)}
                  className={`w-full flex items-start space-x-3 px-4 py-3 text-left transition-colors duration-200 focus:outline-none focus:bg-sky-50 dark:focus:bg-sky-900/20 ${
                    isSelected 
                      ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400'
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${index === themeOptions.length - 1 ? 'rounded-b-lg' : ''}`}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                >
                  <Icon size={18} className="mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{option.label}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Check size={16} className="text-sky-500" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {option.description}
                    </p>
                    {showSystemStatus && (
                      <div className="flex items-center mt-1 space-x-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Currently:</span>
                        <span className="text-xs font-medium text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30 px-1.5 py-0.5 rounded">
                          {systemTheme}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
            
            {/* Preferences Button */}
            <div className="border-t border-gray-200 dark:border-gray-600 mt-1 pt-1">
              <motion.button
                whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
                onClick={openPreferences}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 focus:outline-none focus:bg-sky-50 dark:focus:bg-sky-900/20"
                role="option"
                tabIndex={0}
              >
                <Settings size={16} className="flex-shrink-0" />
                <span className="text-sm">Advanced Settings</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;