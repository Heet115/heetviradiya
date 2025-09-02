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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are the technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Technologies I Work With
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'JavaScript', 'TypeScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS',
              'Responsive Design', 'Git', 'NPM', 'ES6+', 'DOM Manipulation', 'Web APIs'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;