import React, { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ResumeModal from './components/ResumeModal'

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
  }, []);

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <Navbar onHireMeClick={() => setIsResumeModalOpen(true)} />
      <Hero preloaderDone={preloaderDone} />
      <About />
      <Services />
      <Contact />
      <Footer />
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  )
}

export default App
