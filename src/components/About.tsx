import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'HTML & CSS',
    'Tailwind CSS',
    'Responsive Design',
    'Modern Web Development',
    'Frontend Development'
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-br from-white to-sky-50 dark:from-gray-900 dark:to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-sky-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-sky-100 dark:bg-sky-900/30 px-4 py-2 rounded-lg shadow-md border border-sky-200 dark:border-sky-700 mb-6"
          >
            <span className="text-lg">👨‍💻</span>
            <span className="text-sky-600 dark:text-sky-400 font-medium text-sm">About Me</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Professional <span className="text-gradient">Developer</span>
            <br />
            <span className="text-gradient-accent">Problem</span> Solver
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Building modern web applications with clean code and thoughtful design
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="relative inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-64 h-64 mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-700"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #0284c7, #0369a1)',
                  padding: '2px'
                }}
              >
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Professional badges */}
              <motion.div
                className="absolute -top-2 -right-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-3 py-1 rounded-lg font-medium shadow-md text-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                5+ Years
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-3 py-1 rounded-lg font-medium shadow-md text-sm"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                50+ Projects
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="card-gradient">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="text-gradient">Web</span> Developer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Experienced developer specializing in modern web technologies. 
                I create efficient, scalable applications with clean code and intuitive user interfaces.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Focused on delivering high-quality solutions that meet business requirements 
                while maintaining excellent user experience and performance standards.
              </p>
              
              {/* Achievement badges */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-lg border border-sky-200 dark:border-sky-700">
                  <div className="text-2xl font-bold text-sky-600 mb-1">50+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Projects</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-1">5+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Years</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="text-2xl font-bold text-blue-600 mb-1">30+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Clients</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="text-gradient">Technical</span> Skills
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center space-x-2 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;