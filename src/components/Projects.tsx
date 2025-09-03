import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import { getFeaturedProjects, getProjectById, type Project } from '../data/projects';

interface ProjectsProps {
  onNavigateToAllProjects?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onNavigateToAllProjects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = getFeaturedProjects();

  const handleProjectClick = (projectId: string) => {
    const project = getProjectById(projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  if (selectedProject) {
    return (
      <ProjectDetail 
        project={selectedProject} 
        onBack={handleBackToProjects}
      />
    );
  }

  return (
    <section id="projects" className="py-16 bg-gradient-to-br from-white to-sky-50 dark:from-gray-900 dark:to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-48 h-48 bg-gradient-to-br from-sky-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-0 w-40 h-40 bg-gradient-to-br from-gray-400/10 to-slate-400/10 rounded-full blur-2xl"></div>
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
            <span className="text-lg">💼</span>
            <span className="text-sky-600 dark:text-sky-400 font-medium text-sm">Featured Work</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            <span className="text-gradient">Recent</span> Projects
            <br />
            <span className="text-gradient-accent">Professional</span> Work
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of recent projects demonstrating technical expertise and problem-solving skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              delay={index * 0.1}
              onViewDetails={() => handleProjectClick(project.id)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10"
        >
          <motion.button
            onClick={onNavigateToAllProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Projects
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;