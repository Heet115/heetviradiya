import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Senior Full Stack Developer',
      organization: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      duration: '2022 - Present',
      description: 'Leading a team of 5 developers in building scalable web applications. Implemented microservices architecture that improved system performance by 40%. Mentored junior developers and established coding standards.',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      organization: 'StartupXYZ',
      location: 'Remote',
      duration: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using modern web technologies. Built responsive web applications and RESTful APIs. Collaborated with design team to implement pixel-perfect UI components.',
      technologies: ['React', 'Express.js', 'MongoDB', 'Tailwind CSS']
    },
    {
      type: 'education',
      title: 'Master of Computer Science',
      organization: 'Stanford University',
      location: 'Stanford, CA',
      duration: '2018 - 2020',
      description: 'Specialized in Software Engineering and Human-Computer Interaction. Completed thesis on "Improving User Experience in Web Applications through AI-driven Personalization".',
      technologies: ['Machine Learning', 'UI/UX Design', 'Software Architecture']
    },
    {
      type: 'work',
      title: 'Frontend Developer',
      organization: 'Digital Agency Pro',
      location: 'New York, NY',
      duration: '2018 - 2020',
      description: 'Created responsive websites and web applications for various clients. Worked closely with designers to translate mockups into functional interfaces. Optimized applications for maximum speed and scalability.',
      technologies: ['JavaScript', 'Vue.js', 'SCSS', 'Webpack']
    },
    {
      type: 'education',
      title: 'Bachelor of Computer Science',
      organization: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      duration: '2014 - 2018',
      description: 'Graduated Magna Cum Laude with a focus on Software Development and Database Systems. Active member of the Computer Science Student Association and hackathon participant.',
      technologies: ['Java', 'Python', 'Database Design', 'Algorithms']
    }
  ];

  return (
    <section id="experience" className="py-16 bg-gradient-to-br from-sky-50 to-white dark:from-black dark:to-gray-900">
      <div className="container-max section-padding">
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
            <span className="text-lg">📚</span>
            <span className="text-sky-600 dark:text-sky-400 font-medium text-sm">Career Journey</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional journey and educational background that shaped my expertise
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-sky-500 to-blue-500"></div>

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-900 border-3 border-sky-500 rounded-full z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-16 md:ml-0`}>
                  <motion.div
                    whileHover={{ scale: 1.01, y: -2 }}
                    className="card"
                  >
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg mr-3 ${
                        exp.type === 'work' 
                          ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}>
                        {exp.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar size={14} className="mr-1" />
                        {exp.duration}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                      <span className="font-medium">{exp.organization}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {exp.location}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.05 }}
                          className="px-2 py-1 text-xs font-medium bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-lg border border-sky-200 dark:border-sky-700"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-2/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;