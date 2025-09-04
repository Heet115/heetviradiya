import React, { memo, useCallback } from "react";
import { Download, Mail, Github, Linkedin, Hand } from "lucide-react";
import { motion } from "framer-motion";

const Hero: React.FC = memo(() => {
  const handleDownloadCV = useCallback(() => {
    // Create a link to download CV (you'll need to add your CV file to public folder)
    const link = document.createElement("a");
    link.href = "/cv.pdf"; // Add your CV file to public folder
    link.download = "Heet_Viradiya_CV.pdf";
    link.click();
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-black"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-sky-400/15 to-blue-400/15 rounded-full blur-2xl floating-animation"></div>
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-indigo-400/15 rounded-full blur-2xl floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-full blur-2xl floating-animation"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Greeting badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md border border-sky-200 dark:border-sky-700 mb-6"
            >
              <Hand className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span className="text-sky-600 dark:text-sky-400 font-medium text-sm">
                Hello, I'm
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gradient">Heet</span>{" "}
              <span className="text-gradient-accent">Viradiya</span>
            </motion.h1>

            <motion.div
              className="flex flex-wrap justify-center items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-1.5 rounded-lg font-medium text-sm shadow-md">
                Web Developer
              </div>
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-1.5 rounded-lg font-medium text-sm shadow-md">
                UI/UX Designer
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-lg font-medium text-sm shadow-md">
                React Expert
              </div>
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Creating clean, efficient web applications with modern
              technologies. Focused on delivering exceptional user experiences
              through thoughtful design and code.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="btn-primary flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="btn-secondary flex items-center gap-2"
              >
                <Mail size={18} />
                Contact Me
              </motion.button>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 border border-gray-200 dark:border-gray-700"
              >
                <Github size={20} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 border border-gray-200 dark:border-gray-700"
              >
                <Linkedin size={20} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500/50 rounded-full"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => scrollToSection("#about")}
        aria-label="Scroll to About section"
      >
        <div className="w-6 h-10 border-2 border-sky-500 dark:border-sky-400 rounded-full flex justify-center bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm shadow-md">
          <motion.div
            className="w-1.5 h-3 bg-gradient-to-b from-sky-500 to-blue-500 rounded-full mt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </motion.button>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
