import { useState, useEffect } from 'react';

const TypewriterEffect = ({ phrases, typingSpeed = 150, deletingSpeed = 100, delayBetweenPhrases = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const handleTyping = () => {
      const currentPhrase = phrases[currentIndex];
      
      // Set the text based on whether we're typing or deleting
      if (!isDeleting) {
        // Typing
        setCurrentText(current => {
          const nextText = currentPhrase.substring(0, current.length + 1);
          
          // If we've finished typing the current phrase
          if (nextText === currentPhrase) {
            // Set a timeout before starting to delete
            setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
          }
          
          return nextText;
        });
      } else {
        // Deleting
        setCurrentText(current => {
          const nextText = currentPhrase.substring(0, current.length - 1);
          
          // If we've finished deleting the current phrase
          if (nextText === '') {
            setIsDeleting(false);
            // Move to the next phrase
            setCurrentIndex((current) => (current + 1) % phrases.length);
          }
          
          return nextText;
        });
      }
    };

    // Set the typing/deleting speed
    const typingTimer = setTimeout(
      handleTyping, 
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(typingTimer);
  }, [currentText, isDeleting, currentIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypewriterEffect; 