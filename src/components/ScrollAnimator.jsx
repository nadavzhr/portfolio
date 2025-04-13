import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollAnimator = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Select all sections
    const sections = gsap.utils.toArray('.scroll-section');
    
    // Create ScrollTrigger for each section
    sections.forEach((section, index) => {
      const title = section.querySelector('.section-title');
      const content = section.querySelector('.section-content');
      
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      }
      
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      }
      
      // Parallax background effect
      const bg = section.querySelector('.parallax-bg');
      if (bg) {
        gsap.fromTo(
          bg,
          { y: 0 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    });
    
    // Create a horizontal scroll effect for project section
    const horizontalSection = document.querySelector('.horizontal-scroll');
    if (horizontalSection) {
      const container = horizontalSection.querySelector('.horizontal-container');
      const items = gsap.utils.toArray('.horizontal-item');
      
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          end: () => `+=${horizontalSection.offsetWidth}`,
        },
      });
    }

    return () => {
      // Cleanup all ScrollTriggers on component unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default ScrollAnimator; 