import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Palette, Monitor, Smartphone, Save, RotateCcw, Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

type Theme = 'light' | 'dark' | 'system';

interface ThemePreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemePreferences: React.FC<ThemePreferencesProps> = ({ isOpen, onClose }) => {
  const { theme, resolvedTheme, setTheme, systemTheme } = useTheme();
  const [tempTheme, setTempTheme] = useState(theme);
  const [enableTransitions, setEnableTransitions] = useState(
    localStorage.getItem('theme-transitions') !== 'false'
  );
  const [enableSystemSync, setEnableSystemSync] = useState(
    localStorage.getItem('theme-system-sync') !== 'false'
  );

  const handleSave = useCallback(() => {
    setTheme(tempTheme);
    localStorage.setItem('theme-transitions', enableTransitions.toString());
    localStorage.setItem('theme-system-sync', enableSystemSync.toString());
    onClose();
  }, [tempTheme, enableTransitions, enableSystemSync, setTheme, onClose]);

  const handleReset = useCallback(() => {
    setTempTheme('system');
    setEnableTransitions(true);
    setEnableSystemSync(true);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
              <Settings className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Theme Preferences
            </h2>
          </div>

          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Palette className="w-4 h-4 inline mr-2" />
                Theme Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Laptop },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTempTheme(option.value as Theme)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      tempTheme === option.value
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-sky-300 dark:hover:border-sky-600'
                    }`}
                  >
                    <div className="mb-1">
                      <option.icon className="w-6 h-6 mx-auto text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* System Theme Info */}
            {tempTheme === 'system' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-3"
              >
                <div className="flex items-center space-x-2 text-sm text-sky-700 dark:text-sky-300">
                  <Monitor className="w-4 h-4" />
                  <span>System preference: <strong>{systemTheme}</strong></span>
                </div>
              </motion.div>
            )}

            {/* Advanced Options */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Advanced Options
              </h3>
              
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Smooth transitions
                </span>
                <button
                  onClick={() => setEnableTransitions(!enableTransitions)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    enableTransitions ? 'bg-sky-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      enableTransitions ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>

              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Auto-sync with system
                </span>
                <button
                  onClick={() => setEnableSystemSync(!enableSystemSync)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    enableSystemSync ? 'bg-sky-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      enableSystemSync ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Current Status */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Status</div>
              <div className="flex items-center space-x-2 text-sm">
                <Smartphone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  Using <strong>{resolvedTheme}</strong> theme
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleReset}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemePreferences;