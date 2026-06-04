import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiMic, FiMicOff, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Import Modular Data
import profileData from '../data/profile.json';
import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';
import faqData from '../data/faq.json';
import socialsData from '../data/socials.json';
import servicesData from '../data/services.json';

// Combine them into a unified brain object for easy access
const localBrain = {
  profile: profileData,
  skills: skillsData,
  projects: projectsData,
  faq: faqData,
  socials: socialsData,
  services: servicesData
};

const RadaAssistant = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: `Hi, I'm Rada! I'm ${profileData.name}'s AI assistant. Ask me about her projects, skills, or for a copy of her resume!` 
    }
  ]);
  
  const [aiVoice, setAiVoice] = useState(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null); 
  const latestProcessMessage = useRef(null);
  
  // Master Switch to track if the user WANTS the mic on
  const isMicActiveRef = useRef(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Load Standard Browser Text-to-Speech voices (Targeting Indian English Female)
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const indianVoice = voices.find(v => 
          v.name.includes('Veena') ||     
          v.name.includes('Neerja') ||    
          v.name.includes('Heera') ||     
          (v.lang === 'en-IN' && v.name.includes('Female')) || 
          v.lang === 'en-IN'              
        );

        const fallbackVoice = voices.find(v => 
          v.name.includes('Google UK English Female') || 
          v.name.includes('Samantha') || 
          v.name.includes('Zira')
        );

        setAiVoice(indianVoice || fallbackVoice || voices[0]);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, []);

  // Audio browser bypass unlock
  const unlockAudio = () => {
    if (!audioUnlocked && 'speechSynthesis' in window) {
      const silentUtterance = new SpeechSynthesisUtterance('');
      silentUtterance.volume = 0;
      window.speechSynthesis.speak(silentUtterance);
      setAudioUnlocked(true);
    }
  };

  // THE INTEGRATED HYBRID ROUTER LOGIC
  const processMessage = async (textToProcess) => {
    if (!textToProcess.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: textToProcess }]);
    setIsTyping(true);

    const lowerInput = textToProcess.toLowerCase();
    let foundReply = null;

    // Check Local Modular FAQ First (Instant Match)
    for (const [key, value] of Object.entries(localBrain.faq)) {
      if (lowerInput.includes(key)) {
        foundReply = value;
        break;
      }
    }

    // Check specific complex structured data categories locally
    if (!foundReply) {
      if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
        foundReply = `Rakshedha specializes in AI Engineering. Her full stack expertise includes: ${localBrain.skills.join(', ')}.`;
      } 
      else if (lowerInput.includes('portfolio') || lowerInput.includes('project') || lowerInput.includes('work')) {
        foundReply = "I am pulling up Rakshedha's cinematic animated intro right now. Enjoy the showcase!";
        setTimeout(() => {
          onClose(); 
          const videoSection = document.getElementById('video-intro');
          if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = '/video'; 
          }
        }, 2500); 
      } 
      else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
        foundReply = "Sure! You can access her credentials right here: [Download Rakshedha's Resume](/RAKSHEDHA RESUME.pdf)";
      } 
      else if (lowerInput.includes('github') && !lowerInput.includes('linkedin')) {
        foundReply = `You can check out her code repositories here: [GitHub](${localBrain.socials.github})`;
      } 
      else if (lowerInput.includes('linkedin') && !lowerInput.includes('github')) {
        foundReply = `You can connect with her professionally right here: [LinkedIn](${localBrain.socials.linkedin})`;
      } 
      else if (lowerInput.includes('contact') || lowerInput.includes('email')) {
        foundReply = `You can get in touch with her via LinkedIn, or drop a direct inquiry here: [Email Rakshedha](mailto:${localBrain.socials.email})`;
      } 
      else if (lowerInput.includes('social') || lowerInput.includes('links')) {
        foundReply = `Explore her platforms: [GitHub](${localBrain.socials.github}) or connect on [LinkedIn](${localBrain.socials.linkedin}).`;
      }
    }

    if (foundReply) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: foundReply }]);
        setIsTyping(false);
        speakText(foundReply);
      }, 400);
      return;
    }

    // Dynamic Fallback: Query the Ultra-Fast Groq API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: textToProcess,
          chatHistory: messages.map(msg => ({ role: msg.role, content: msg.content })),
          contextBrain: localBrain 
        })
      });

      const data = await response.json();
      const aiReply = data.reply || data.error;

      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
      setIsTyping(false);
      speakText(aiReply);

    } catch (error) {
      const errorMessage = "Network bottleneck caught. Reach Rakshedha at her email directly!";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
      setIsTyping(false);
      speakText(errorMessage);
    }
  };

  // Keep the ref constantly updated with the latest version of processMessage
  useEffect(() => {
    latestProcessMessage.current = processMessage;
  });

  // CONTINUOUS SPEECH RECOGNITION LOGIC
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;  
      recognition.interimResults = true; 
      recognition.lang = 'en-IN'; 

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (interimTranscript) {
          setInput(interimTranscript);
        }

        if (finalTranscript) {
          setInput(''); 
          if (latestProcessMessage.current) {
            latestProcessMessage.current(finalTranscript);
          }
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
          isMicActiveRef.current = false;
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        if (isMicActiveRef.current && !window.speechSynthesis.speaking) {
          try { recognition.start(); } catch(e) {}
        } else if (!isMicActiveRef.current) {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      
      const cleanText = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      if (aiVoice) utterance.voice = aiVoice;
      utterance.rate = 1.0; 
      utterance.pitch = 1.1; 
      
      if (isMicActiveRef.current && recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }

      utterance.onend = utterance.onerror = () => {
        if (isMicActiveRef.current && recognitionRef.current) {
          try { recognitionRef.current.start(); } catch(e) {}
        }
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    unlockAudio();
    processMessage(input);
    setInput(''); 
  };

  const toggleListen = () => {
    unlockAudio();
    if (!recognitionRef.current) {
      alert("Browser speech profile incompatible. Use desktop Chrome/Edge!");
      return;
    }
    
    if (isMicActiveRef.current) {
      isMicActiveRef.current = false;
      setIsListening(false);
      try { recognitionRef.current.stop(); } catch(e) {}
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      isMicActiveRef.current = true;
      setIsListening(true);
      try { recognitionRef.current.start(); } catch(e) {}
    }
  };

  // UPDATED: Secure Markdown Link Parser with Auto-Download for PDFs
  const renderMessage = (text) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const linkUrl = match[2];
      const isPdf = linkUrl.toLowerCase().endsWith('.pdf');

      parts.push(
        <a 
          key={match.index} 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          // If it's a PDF, force the browser to download it instead of opening it!
          download={isPdf ? "Rakshedha_Resume.pdf" : undefined}
          className="text-blue-400 font-bold hover:text-blue-300 underline underline-offset-4 decoration-blue-500/50 hover:decoration-blue-300 transition-colors drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="fixed inset-0 z-[300] h-[100dvh] w-screen flex flex-col items-center justify-center p-4 sm:p-8 font-sans text-white overflow-hidden bg-black">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
      
      <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all z-20">
        <FiX size={24} />
      </button>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center text-center mb-8 w-full shrink-0">
          <div className="flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium text-white/80 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Groq LPU Powered Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">Welcome to my portfolio</h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl px-4 drop-shadow-md">{localBrain.profile.bio}</p>
        </div>

        <div className="w-full max-w-3xl flex flex-col bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl h-[55vh] max-h-[500px]">
          <div className="text-center text-white/40 text-xs font-medium mb-4 shrink-0">Chat or interact with my hybrid assistant about my portfolio</div>

          <div className="flex-1 overflow-y-auto px-2 space-y-4 scrollbar-hide flex flex-col mb-4">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-4 text-sm md:text-base leading-relaxed shadow-lg ${msg.role === 'user' ? 'bg-white/15 text-white rounded-3xl rounded-br-sm backdrop-blur-md' : 'bg-black/50 border border-white/10 text-white/90 rounded-3xl rounded-bl-sm backdrop-blur-md'}`}>
                    {renderMessage(msg.content)}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                   <div className="px-5 py-4 bg-black/50 border border-white/10 text-white/50 rounded-3xl rounded-bl-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          <div className="relative shrink-0 w-full">
            <form onSubmit={handleSend} className="relative flex items-center w-full">
              <input 
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening natively..." : "Ask about my projects, skills, experience..."}
                className="w-full bg-black/50 border border-white/10 rounded-full py-4 pl-6 pr-[110px] text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors shadow-inner backdrop-blur-md"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button type="button" onClick={toggleListen} className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${isListening ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'}`}>
                  {isListening ? <FiMicOff size={18} /> : <FiMic size={18} />}
                </button>
                <button type="submit" disabled={!input.trim()} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 disabled:opacity-50 disabled:hover:bg-transparent transition-all">
                  <FiSend size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RadaAssistant;