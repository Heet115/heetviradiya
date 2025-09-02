import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: string[];
  delay?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  skills, 
  delay = 0 
}) => {
  const gradients = [
    'from-sky-500 to-blue-500',
    'from-gray-700 to-gray-900', 
    'from-blue-600 to-indigo-600',
    'from-slate-600 to-gray-800'
  ];
  
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="card group relative overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-sky-500/25 transition-all duration-300`}
      >
        <Icon size={24} className="text-white" />
      </motion.div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {description}
      </p>
      
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.1 + index * 0.1 }}
            whileHover={{ x: 5, scale: 1.02 }}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-300"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;