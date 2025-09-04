import { useState, useEffect } from 'react';

// Hook to dynamically load framer-motion only when needed
export const useMotion = () => {
  const [motion, setMotion] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load framer-motion only after user interaction or delay
    const loadMotion = async () => {
      if (motion) return;
      
      try {
        const framerMotion = await import('framer-motion');
        setMotion(framerMotion);
        setIsLoaded(true);
      } catch (error) {
        console.warn('Failed to load framer-motion:', error);
      }
    };

    // Load on user interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const handleInteraction = () => {
      loadMotion();
      events.forEach(event => document.removeEventListener(event, handleInteraction, true));
    };

    events.forEach(event => document.addEventListener(event, handleInteraction, true));
    
    // Fallback after 1 second
    const timer = setTimeout(loadMotion, 1000);

    return () => {
      clearTimeout(timer);
      events.forEach(event => document.removeEventListener(event, handleInteraction, true));
    };
  }, [motion]);

  return { motion, isLoaded };
};