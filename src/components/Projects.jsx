import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Modern and responsive personal portfolio showcasing projects and skills',
      image: '/robot.webp',
      link: '#',
      tags: ['React', 'Tailwind CSS', 'Vite'],
    },
    {
      id: 2,
      title: 'Network Optimization in Distributed Systems',
      description: 'An intilligent approach to optimizing collective operations in distributed GPU systems, using Mixed Intiger Programming.',
      image: '/server_thumbnail.png',
      link: 'https://nadavzhr.github.io/html-network-opt/',
      tags: ['Python', 'SCIPOpt', 'Manim'],
    },
    {
      id: 3,
      title: 'Automatic Classfication of Frame Angle',
      description: 'Computer Vision project for automatic classification of frame angle in images. neural network based.',
      image: '/computer-vision.webp',
      link: '#',
      tags: ['PyTorch', 'CV', 'ML'],
    },
    {
      id: 4,
      title: 'Real-Time 3D Satellite Tracking System',
      description: 'Platform for tracking and visualizing satellites in real-time, with a focus on user-friendly interface and performance optimization.',
      image: '/satellite-view.webp',
      link: '#',
      tags: ['JavaScript', 'API (use N2YO)', 'CSS', 'N2YO API'],
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const handleProjectHover = (id) => {
    setActiveProject(id);
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-slate-950 overflow-hidden">
      <div className="section-container">
        <motion.div 
          ref={sectionRef}
          className="space-y-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              A selection of my recent work, showcasing my skills in software development and design.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="group"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => handleProjectHover(project.id)}
                onHoverEnd={() => handleProjectHover(null)}
              >
                <a
                  href={project.link}
                  className="block bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-500 h-full"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activeProject === project.id ? 0.7 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.div 
                      className="absolute top-2 right-2 flex flex-wrap gap-2 justify-end"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ 
                        opacity: activeProject === project.id ? 1 : 0,
                        y: activeProject === project.id ? 0 : -20 
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 text-xs font-medium bg-indigo-500/80 text-white rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {project.description}
                    </p>
                    
                    <motion.div
                      className="mt-4 flex items-center text-sm text-indigo-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: activeProject === project.id ? 1 : 0,
                        x: activeProject === project.id ? 0 : -10 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>View Project</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.a 
              href="https://github.com/nadavzhr" 
              target="_blank" 
              rel="noreferrer"
              className="btn btn-primary inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 