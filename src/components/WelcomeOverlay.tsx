import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../contexts/ThemeContext";
import { Hand } from "lucide-react";

export default function WelcomeOverlay({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const [showOverlay, setShowOverlay] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const themeContext = useContext(ThemeContext);
  const isDark = themeContext?.resolvedTheme === 'dark';
  
  const fullText = "Heet Viradiya";
  const subtitle = "Web Developer & UI/UX Designer";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(typingInterval);
        // Show wave and subtitle after name is complete
        setTimeout(() => {
          setShowWave(true);
          setShowSubtitle(true);
        }, 300);
        
        // Wait before fade out
        setTimeout(() => {
          setShowOverlay(false);
          setTimeout(() => {
            onFinish();
          }, 1200); // Matches exit animation duration
        }, 2500);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          key="welcome"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center px-4 ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
              : 'bg-gradient-to-br from-sky-50 via-white to-blue-50'
          }`}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-sky-400/20 to-blue-400/20' 
                  : 'bg-gradient-to-br from-sky-400/15 to-blue-400/15'
              }`}
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div
              className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-400/20 to-indigo-400/20' 
                  : 'bg-gradient-to-br from-blue-400/15 to-indigo-400/15'
              }`}
              animate={{ 
                y: [0, 20, 0],
                x: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-2xl ${
                isDark 
                  ? 'bg-gradient-to-br from-gray-400/15 to-slate-400/15' 
                  : 'bg-gradient-to-br from-gray-400/10 to-slate-400/10'
              }`}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: 4
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Wave emoji */}
            <AnimatePresence>
              {showWave && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className="mb-6"
                >
                  <motion.div
                    className="text-6xl flex justify-center"
                    animate={{ 
                      rotate: [0, 20, -10, 20, 0],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <Hand className={`w-16 h-16 ${isDark ? 'text-sky-400' : 'text-sky-500'}`} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name with typewriter effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.1",
              }}
            >
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
                {displayText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={`${isDark ? 'text-sky-400' : 'text-sky-500'}`}
              >
                |
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <AnimatePresence>
              {showSubtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-4"
                >
                  <motion.p
                    className={`text-lg md:text-xl font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {subtitle}
                  </motion.p>
                  
                  {/* Tech badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 mt-6"
                  >
                    {['React', 'TypeScript', 'UI/UX'].map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.8 + index * 0.1,
                          ease: "backOut"
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium shadow-lg ${
                          isDark 
                            ? 'bg-gray-800/80 text-sky-400 border border-gray-700' 
                            : 'bg-white/90 text-sky-600 border border-sky-200'
                        } backdrop-blur-sm`}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center space-x-2 mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    isDark ? 'bg-sky-400' : 'bg-sky-500'
                  }`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}