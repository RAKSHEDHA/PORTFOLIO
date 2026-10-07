import React, { useState, useEffect } from 'react';

import IntroScreen from './components/IntroScreen';
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Navbar from './components/Navbar';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import RadaAssistant from './components/RadaAssistant';

function App() {
  const [isRadaOpen, setIsRadaOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  // Handle hash-based navigation for RADA AI Assistant
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#rada') {
        setIsRadaOpen(true);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Show intro screen before the portfolio
  if (!introComplete) {
    return (
      <IntroScreen
        onComplete={() => {
          setIntroComplete(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Portfolio Content */}
      <Hero />
      <Experience />
      <TechStack />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />

      {/* RADA AI Assistant Overlay */}
      {isRadaOpen && (
        <RadaAssistant
          onClose={() => {
            setIsRadaOpen(false);
            window.location.hash = '';
          }}
        />
      )}

      {/* Floating RADA Button */}
      {!isRadaOpen && (
        <button
          onClick={() => {
            setIsRadaOpen(true);
            window.location.hash = 'rada';
          }}
          className="fixed bottom-8 right-8 z-[250] flex items-center justify-center gap-3 rounded-full border border-white/20 bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-transform hover:scale-105"
        >
          <span className="text-lg">✺</span>
          Ask Rada
        </button>
      )}
    </div>
  );
}

export default App;

