import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Server, Smartphone } from 'lucide-react';
import SkillCard from './SkillCard';

const Skills: React.FC = () => {
  const skillsData = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces with modern web technologies.',
      skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3']
    },
    {
      icon: Palette,
      title: 'Styling & Design',
      description: 'Building beautiful, responsive designs with modern CSS frameworks.',
      skills: ['Tailwind CSS', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid Layout']
    },
    {
      icon: Server,
      title: 'Web Technologies',
      description: 'Working with modern web development tools and best practices.',
      skills: ['ES6+', 'DOM Manipulation', 'Web APIs', 'Git', 'NPM/Yarn']
    },
    {
      icon: Smartphone,
      title: 'Responsive Development',
      description: 'Creating mobile-first, cross-device compatible web applications.',
      skills: ['Mobile-First Design', 'Cross-Browser Compatibility', 'Performance Optimization', 'Accessibility', 'SEO']
    }
  ];

  return (
    <section id="skills" className="py-16 bg-gradient-to-br from-sky-50 to-white dark:from-black dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-36 h-36 bg-gradient-to-br from-sky-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-sky-100 dark:bg-sky-900/30 px-4 py-2 rounded-lg shadow-md border border-sky-200 dark:border-sky-700 mb-6"
          >
            <span className="text-lg">⚡</span>
            <span className="text-sky-600 dark:text-sky-400 font-medium text-sm">Skills & Expertise</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            <span className="text-gradient">Technical</span> Skills
            <br />
            <span className="text-gradient-accent">Professional</span> Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modern technologies and best practices for web development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              skills={skill.skills}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            <span className="text-gradient">Core</span> Technologies
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS',
              'Responsive Design', 'Git', 'NPM', 'ES6+', 'DOM Manipulation', 'Web APIs'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group px-4 py-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-default border border-gray-200 dark:border-gray-600 hover:border-sky-300 dark:hover:border-sky-600"
              >
                <span className="font-medium group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300 text-sm">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;