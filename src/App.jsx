import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import ScrollAnimator from './components/ScrollAnimator'
import QuirkyChat from './components/QuirkyChat'

function App() {

  return (
    <AnimatePresence>
      <div className="relative min-h-screen">
        {/* Particle background with higher z-index to ensure visibility across all sections */}
        <ParticleBackground />
        
        <div 
          className="min-h-screen flex flex-col bg-transparent relative z-10"
        >
          <Header />
          <ScrollAnimator>
            <main className="flex-grow">
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Contact />
            </main>
          </ScrollAnimator>
          <Footer />
        </div>
        
        {/* Interactive chat component */}
        <QuirkyChat />
      </div>
    </AnimatePresence>
  )
}

export default App
