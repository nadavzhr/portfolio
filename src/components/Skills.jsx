import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillCircle = ({ skill, level, icon, delay }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (level / 100) * circumference;
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
    >
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#1e293b"
            strokeWidth="5"
            fill="transparent"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#skillGradient)"
            strokeWidth="5"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: delay * 0.1 }}
            transform="rotate(-90 50 50)"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
      <p className="mt-3 font-medium text-gray-300">{skill}</p>
      <p className="text-sm text-indigo-500 font-bold">{level}%</p>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Programming Languages');
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Skill categories with icons/logos
  const skillCategories = [
    {
      name: 'Programming Languages',
      skills: [
        { name: 'Python', icon: '🐍', level: 95 },
        { name: 'C\\C++', icon: '🔧', level: 90 },
        { name: 'JavaScript', icon: '𝐉𝐒', level: 88 },
        { name: 'TypeScript', icon: '𝐓𝐒', level: 82 },
        { name: 'Java', icon: '☕', level: 75 },
      ],
    },
    {
      name: 'Web Development',
      skills: [
        { name: 'React', icon: '⚛️', level: 85 },
        { name: 'HTML5', icon: '🌐', level: 92 },
        { name: 'CSS3', icon: '🎨', level: 85 },
        { name: 'Tailwind CSS', icon: '🌊', level: 88 },
        { name: 'Node.js', icon: '🟢', level: 78 },
      ],
    },
    {
      name: 'Tools & Technologies',
      skills: [
        { name: 'Git', icon: '🔄', level: 90 },
        { name: 'Docker', icon: '🐳', level: 82 },
        { name: 'AWS', icon: '☁️', level: 75 },
        { name: 'MongoDB', icon: '🍃', level: 80 },
        { name: 'Machine Learning', icon: '🧠', level: 80 },
      ],
    },
  ];

  const activeSkills = skillCategories.find(category => category.name === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-20 md:py-32 bg-slate-900 scroll-section">
      <div className="section-container">
        <motion.div 
          ref={sectionRef}
          className="relative z-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 section-title">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto section-content">
              My technical toolkit and areas of expertise
            </p>
          </motion.div>
          
          {/* Category Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            {skillCategories.map((category, index) => (
              <motion.button
                key={index}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-slate-950 text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveCategory(category.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Skill Circles */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16"
            variants={containerVariants}
            key={activeCategory} // Re-render animation when category changes
            initial="hidden"
            animate="visible"
          >
            {activeSkills.map((skill, index) => (
              <SkillCircle
                key={index}
                skill={skill.name}
                level={skill.level}
                icon={skill.icon}
                delay={index}
              />
            ))}
          </motion.div>
          
          {/* Skill Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index} 
                className="bg-slate-950 rounded-xl p-8 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-bold mb-6 gradient-text">
                  {category.name}
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-gray-800 rounded-lg hover:border-indigo-500/50 transition-colors group"
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + index * 0.1 }}
                    >
                      <span className="text-xl" role="img" aria-label={skill.name}>
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 