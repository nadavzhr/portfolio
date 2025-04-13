import ParticleBackground from './ParticleBackground';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 border-t border-gray-800">
      <div className="section-container py-8">
        <ParticleBackground />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-xl font-bold gradient-text font-poppins tracking-tight">Nadav.dev</a>
          </div>
          
          <div className="text-center md:text-right text-gray-400 text-sm">
            <p>© {currentYear} Nadav. All rights reserved.</p>
            <p className="mt-1">
              Designed & Built with{' '}
              <span role="img" aria-label="heart" className="text-red-500">
                ❤️
              </span>{' '}
              using React & Tailwind CSS
            </p>
          </div>
        </div>
        
        {/* Back to top button */}
        <div className="flex justify-center mt-8">
          <a 
            href="#" 
            className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 