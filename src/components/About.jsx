import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [animationData, setAnimationData] = useState(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  useEffect(() => {
    // Load the Lottie animation JSON file
    fetch('/spaceman_dev_animation.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="bg-slate-900 py-20 md:py-32 scroll-section">
      <div className="section-container relative">
        {/* Remove only the parallax background element with blurred circles */}
        
        <motion.div 
          ref={sectionRef}
          className="relative z-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 section-title"
            variants={itemVariants}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* About text */}
            <motion.div 
              className="space-y-6 section-content"
              variants={itemVariants}
            >
              <p className="text-gray-300 leading-relaxed">
                Hi, I'm <span className="text-white font-semibold">Nadav</span>, a passionate software developer with a deep love for creating efficient, elegant solutions to complex problems. My journey in software development began with a curiosity about how things work behind the scenes, which evolved into a dedicated career path.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                My expertise spans multiple languages and frameworks, including Python, C++, JavaScript, and React. I enjoy working on both frontend and backend technologies, bringing a holistic approach to software development that emphasizes performance, user experience, and clean code.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, I'm constantly expanding my knowledge through online courses, technical literature, and open-source contributions. I believe in continuous learning and staying current with emerging technologies and best practices in the ever-evolving tech landscape.
              </p>
              
              <motion.div 
                className="pt-4"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#contact" 
                  className="btn btn-primary inline-flex items-center"
                >
                  Let's Connect
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
            
            {/* Image or decorative element */}
            <motion.div 
              className="relative"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-square bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                {animationData && (
                  <Lottie 
                    animationData={animationData} 
                    loop={true}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 