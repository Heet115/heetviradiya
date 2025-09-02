import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com',
      label: 'Twitter'
    },
    {
      icon: Mail,
      href: 'mailto:hpviradiya05@gmail.com',
      label: 'Email'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-10">
      <div className="container-max section-padding">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-2xl font-bold text-gradient mb-4 cursor-pointer"
            >
              Heet.dev
            </motion.button>
            
            <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
              Thanks for visiting my portfolio. Let's connect and create something amazing together!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center space-x-4 mb-6"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 bg-gray-800 hover:bg-sky-600 rounded-lg transition-all duration-300 hover:shadow-md"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-gray-800 pt-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <p className="text-gray-400 text-xs">
                © {new Date().getFullYear()} Heet Viradiya. All rights reserved.
              </p>
              
              <motion.div
                className="flex items-center space-x-1 text-gray-400 text-xs"
                whileHover={{ scale: 1.02 }}
              >
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart size={14} className="text-red-500 fill-current" />
                </motion.div>
                <span>using React & Tailwind CSS</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;