import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub as Github, FiLinkedin as Linkedin } from 'react-icons/fi';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <>
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen bg-white overflow-hidden text-black font-sans selection:bg-black selection:text-white pt-24 md:pt-32 border-b border-black/10 shadow-sm">
        
        {/* --- LIGHT GRID LINES BACKGROUND --- */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>

        {/* --- LEFT SIDEBAR (Social Squares Only) --- */}
<div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col z-40">
  <div className="flex flex-col gap-4 items-center">
    <a href="https://github.com/RAKSHEDHA" target="_blank" rel="noreferrer" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <Github size={18} />
    </a>
    <a href="https://www.linkedin.com/in/rakshedha" target="_blank" rel="noreferrer" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <Linkedin size={18} />
    </a>
    <a href="https://medium.com/@rakshecode" target="_blank" rel="noreferrer" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-xs">
      M
    </a>
  </div>
</div>

        {/* --- HERO IMAGE --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[65vh] md:h-[75vh] lg:h-[95vh] z-10 pointer-events-none"
        >
          <img 
            src="/images/me.png" 
            alt="Rakshedha Balachander" 
            className="h-full w-auto object-contain object-bottom transition-all duration-700"
          />
        </motion.div>

        {/* --- MAIN HERO CONTENT --- */}
        <div className="relative z-20 w-full max-w-[90rem] mx-auto px-8 lg:pl-28 lg:pr-12 flex flex-col lg:flex-row justify-between h-full">
          
          <div className="w-full lg:w-[45%] flex flex-col justify-center pb-20 lg:pb-0 pt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 flex items-center gap-4"
            >
              <p className="text-lg font-bold">Hi, I'm</p>
              <div className="h-[2px] w-12 bg-black"></div>
              <p className="text-xs font-black text-white bg-black px-3 py-1 tracking-wider uppercase">AI & Software Engineer</p>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[3rem] sm:text-[3rem] lg:text-[3rem] font-black leading-[0.8] tracking-tighter mb-10 uppercase mix-blend-normal drop-shadow-md"
            >
              Rakshedha
              <br />
              Balachander
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-auto z-30"
            >
              {['Software Engineer', 'AI Engineer', 'Freelancer'].map((tech, index) => (
                <span key={index} className="px-2 py-2 bg-white border-2 border-black text-black font-black text-[10px] tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all cursor-default">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="w-full lg:w-[30%] relative flex flex-col justify-center gap-5 mt-12 lg:mt-0 z-30 lg:items-end">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-5 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-[280px] min-h-[150px] flex flex-col justify-center"
            >
              <p className="text-xs font-black leading-snug mb-3 uppercase tracking-tight">
                Transforming complex data into <span className="bg-black text-white px-1">intelligent solutions</span> with scalable backend architecture & cutting-edge AI.
              </p>
              <div className="h-[2px] w-full bg-black/10 my-2"></div>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                Available for freelance & full-time opportunities.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white p-5 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-[280px] min-h-[150px] flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="font-black text-[11px] uppercase tracking-widest leading-tight">Specializing in Scalable AI</span>
              </div>
              <div className="flex flex-col gap-2 text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-auto">
                <p>Based in TamilNadu, India</p>
                <p className="flex items-center gap-2 text-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  Available To Work Worldwide
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- NEW SECTION: ABOUT ME --- */}
      <div id="about" className="relative w-full min-h-screen bg-white flex items-center py-24 px-8 md:px-16 lg:px-32 z-10">
        
        {/* Continuing the grid background from the Hero for consistency */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT SIDE: The Pencil Sketch Frame & Photo */}
          <div className="relative w-full max-w-md mx-auto aspect-square group">
            
            {/* The layered "Pencil Sketch" Outlines */}
            {/* Outline 1: Slightly rotated right */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 border-[1px] border-black/80 rotate-2 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
            {/* Outline 2: Slightly rotated left */}
            <div className="absolute inset-0 translate-x-1 translate-y-5 border-[1px] border-black/40 -rotate-1 transition-transform duration-500 group-hover:-translate-x-1 group-hover:translate-y-6"></div>

            {/* The actual photo container */}
            <div className="absolute inset-0 overflow-hidden bg-white">
              <img 
                  src="/images/about.png" 
                  alt="Rakshedha - AI Engineer" 
                  className="w-full h-full object-cover transition-all duration-700 scale-105"
              />
            </div>
          </div>

          {/* RIGHT SIDE: Text based on your reference images */}
          <div className="flex flex-col justify-center">
            
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 mb-4">
              Hello, This Is Me
            </p>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter leading-tight mb-8">
              A little story<br/>
              <span className="bg-[#e8ece0] px-3 inline-block mt-2">about me</span>
            </h2>

           <p className="text-lg text-gray-700 leading-relaxed font-medium mb-6">
            Every intelligent system starts with a complex problem. As an AI &amp; Software Engineer, I love turning complex problems into clean, powerful code. My focus is on building scalable backends and smart AI systems I build real-world tools that connect advanced machine learning with solid cloud infrastructure
</p>

<p className="text-lg text-gray-700 leading-relaxed font-medium mb-10">
  Beyond my core projects, I also take on freelance work! Whether you need autonomous AI agents to automate your business workflows, or a lightning-fast, cinematic website to make your brand stand out—I build custom solutions from scratch.
</p>

            <div>
              <button className="px-8 py-3 border-2 border-black text-black font-bold text-sm tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors">
                Get My Resume
              </button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}