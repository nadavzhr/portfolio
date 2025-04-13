import { useEffect } from 'react';

const EasterEggs = () => {
  useEffect(() => {
    let konami = [];
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];
    
    // Confetti effect
    const triggerConfetti = () => {
      const colors = ['#6366f1', '#a855f7', '#ec4899'];
      
      // Create confetti elements
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '1000';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.top = '-10px';
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.opacity = '1';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.transition = 'top 3s, opacity 3s';
        
        document.body.appendChild(confetti);
        
        // Animate falling confetti
        setTimeout(() => {
          confetti.style.top = `${window.innerHeight + 10}px`;
          confetti.style.opacity = '0';
        }, 10);
        
        // Remove from DOM after animation
        setTimeout(() => {
          document.body.removeChild(confetti);
        }, 3000);
      }
    };
    
    // Matrix code effect
    const triggerMatrixEffect = () => {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '999';
      canvas.style.opacity = '0.8';
      canvas.style.pointerEvents = 'none';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      const characters = "01";
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      
      // Array to track y position of each column
      const drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1;
      }
      
      // Draw the matrix
      const drawMatrix = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#6366f1';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          
          drops[i]++;
        }
      };
      
      // Matrix animation
      const matrix = setInterval(drawMatrix, 50);
      
      // Remove after 5 seconds
      setTimeout(() => {
        clearInterval(matrix);
        document.body.removeChild(canvas);
      }, 5000);
    };
    
    // Konami code handler
    const handleKeyDown = (e) => {
      konami.push(e.key);
      if (konami.length > konamiCode.length) {
        konami.shift();
      }
      
      if (konami.join(',') === konamiCode.join(',')) {
        konami = [];
        triggerConfetti();
        
        // Show message
        const message = document.createElement('div');
        message.textContent = "You found a secret! 🎉";
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.padding = '10px 20px';
        message.style.backgroundColor = '#6366f1';
        message.style.color = 'white';
        message.style.borderRadius = '5px';
        message.style.fontWeight = 'bold';
        message.style.zIndex = '1001';
        message.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        
        document.body.appendChild(message);
        
        // Remove message after 3 seconds
        setTimeout(() => {
          document.body.removeChild(message);
        }, 3000);
      }
    };
    
    // Triple-click on logo handler
    const handleTripleClick = (e) => {
      // Check if target is your name in the header (you'll need to adjust this selector)
      if (e.target.textContent === 'Nadav' || e.target.classList.contains('logo')) {
        triggerMatrixEffect();
      }
    };
    
    // Register event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dblclick', handleTripleClick);
    
    // Register clock time easter egg (at 4:04 PM)
    const checkTime = () => {
      const now = new Date();
      if (now.getHours() === 16 && now.getMinutes() === 4) {
        const message = document.createElement('div');
        message.textContent = "Error 404: Time not found ⏰";
        message.style.position = 'fixed';
        message.style.bottom = '20px';
        message.style.right = '20px';
        message.style.padding = '10px 20px';
        message.style.backgroundColor = '#ef4444';
        message.style.color = 'white';
        message.style.borderRadius = '5px';
        message.style.fontWeight = 'bold';
        message.style.zIndex = '1001';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
          document.body.removeChild(message);
        }, 5000);
      }
    };
    
    const timeInterval = setInterval(checkTime, 60000); // Check every minute
    
    // Clean up
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dblclick', handleTripleClick);
      clearInterval(timeInterval);
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default EasterEggs; 