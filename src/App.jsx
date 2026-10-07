import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import VideoIntro from './components/VideoIntro'; 
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Navbar from './components/Navbar';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection'; 
import RadaAssistant from './components/RadaAssistant';

function App() {
  // State to control the AI Assistant visibility
  const [isRadaOpen, setIsRadaOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  // Handle hash-based navigation for Rada AI Assistant
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#rada') {
        setIsRadaOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    // FIXED: Changed overflow-hidden to overflow-x-clip so sticky cards work!
    <div className="relative w-full overflow-x-clip">
      {/* 1. The Intro Screen loads first */}
      <IntroScreen onComplete={() => setIntroComplete(true)} /> 

      {/* 2. The Cinematic Video Intro - Only shows after intro screen */}
      {introComplete && <VideoIntro />} 

      {/* 3. Portfolio content */}
      <Navbar />
      <Hero />
      <Experience />
      <TechStack /> 
      <ProjectsSection />
      <ServicesSection />
      
      {/* 4. Final Contact Section */}
      <ContactSection />

      {/* 5. RADA AI Assistant Overlay */}
      {isRadaOpen && (
        <RadaAssistant onClose={() => {
          setIsRadaOpen(false);
          window.location.hash = '';
        }} />
      )}

      {/* 6. Global Floating Button to open Rada from anywhere */}
      {!isRadaOpen && (
        <button
          onClick={() => {
            setIsRadaOpen(true);
            window.location.hash = 'rada';
          }}
          className="fixed bottom-8 right-8 z-[250] flex items-center justify-center gap-3 rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-transform hover:scale-105 border border-white/20"
        >
          <span className="text-lg">✺</span> Ask Rada
        </button>
      )}
    </div>
  );
}

export default App;