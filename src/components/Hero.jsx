import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroScene from './HeroScene';
import TypewriterEffect from './TypewriterEffect';

const Hero = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const roles = [
    'Frontend Developer',
    'UI/UX Designer',
    'Computer & Software Engineering Student',
    'Overall an awesome guy',
    'Creative Coder'
  ];

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Scene */}
      <HeroScene />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 z-10"></div>
      
      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
          variants={itemVariants}
        >
          Hello, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Nadav Zohar</span>
        </motion.h1>
        
        <motion.div
          className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 h-12"
          variants={itemVariants}
        >
          <TypewriterEffect phrases={roles} typingSpeed={100} deletingSpeed={80} delayBetweenPhrases={2000} />
        </motion.div>
        
        <motion.p
          className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8"
          variants={itemVariants}
        >
          Explore my interactive 3D portfolio built with React, Three.js, and cutting-edge web technologies.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <motion.a 
            href="#about"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 px-8 rounded-full inline-block mr-4 shadow-lg transform transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Me
          </motion.a>
          
          <motion.a 
            href="#projects"
            className="bg-transparent border-2 border-white hover:border-indigo-400 text-white font-semibold py-3 px-8 rounded-full inline-block shadow-lg transform transition duration-300 hover:scale-105"
            whileHover={{ scale: 1.05, borderColor: "#818cf8" }}
            whileTap={{ scale: 0.95 }}
          >
            View Work
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: hasScrolled ? 0 : 1, 
          y: hasScrolled ? -40 : 0,
          transition: { duration: 0.5 } 
        }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1"
          animate={{ 
            boxShadow: ["0 0 0 rgba(255, 255, 255, 0)", "0 0 8px rgba(255, 255, 255, 0.5)", "0 0 0 rgba(255, 255, 255, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <p className="text-white text-sm mt-2 text-center">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero; 