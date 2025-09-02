import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  const currentTheme = themeOptions.find(option => option.value === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeSelect = (selectedTheme: typeof theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-800/50 transition-all duration-300 shadow-md hover:shadow-sky-500/25"
        title={`Current: ${theme} ${theme === 'system' ? `(${resolvedTheme})` : ''}`}
      >
        {currentTheme && <currentTheme.icon size={18} />}
        <span className="hidden sm:inline text-sm font-medium">{currentTheme?.label}</span>
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
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = option.value === theme;
              
              return (
                <motion.button
                  key={option.value}
                  whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.1)' }}
                  onClick={() => handleThemeSelect(option.value)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                    isSelected 
                      ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{option.label}</span>
                  {option.value === 'system' && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                      ({resolvedTheme})
                    </span>
                  )}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-sky-500 rounded-full ml-auto"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;