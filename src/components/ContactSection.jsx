import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const ContactSection = () => {
  return (
    <section 
      id="contact" 
      className="relative w-full min-h-screen bg-white text-black px-8 md:px-16 lg:px-32 flex flex-col border-t border-black/10 overflow-hidden pt-20"
    >
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* Page Title */}
      <div className="relative z-10 mb-16 text-center">
        <h1 
          className="font-black uppercase tracking-tighter leading-none text-black text-8xl md:text-9xl lg:text-[120px]"
        >
          <span className="bg-[#dff6e3] rounded-sm px-4">CONTACT</span>
        </h1>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center pt-8">
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full flex-grow gap-8">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start">
          <div className="mb-12">
            <p className="text-lg font-black uppercase tracking-widest text-black/60 mb-2">AI & Software Engineer</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tighter uppercase">
              Rakshedha<br/>Balachander
            </h1>
          </div>

          <h2 className="text-[3rem] sm:text-[4rem] font-black leading-[0.8] tracking-tighter uppercase mb-6">
            Let's<br/>
            <span className="text-black/20">Talk.</span>
          </h2>
          <p className="text-lg font-medium text-gray-600 mb-8 max-w-sm">
            Have a project in mind or just want to discuss AI architecture? My inbox is always open.
          </p>
        </div>

        {/* Center: Larger Photo - Now anchored to the bottom */}
        <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[100vh] md:h-[110vh] lg:h-[140vh] z-10 pointer-events-none"
                >
                  <img 
                    src="/images/me.png" 
                    alt="Rakshedha Balachander" 
                    className="h-full w-auto object-contain object-bottom transition-all duration-700"
                  />
                </motion.div>
        

        {/* Right: AI Button & Socials & Action */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start gap-6 lg:items-end">
          <div className="flex flex-col lg:items-end gap-3">
            <p className="text-sm font-bold uppercase tracking-widest text-black/70">Specializing in Scalable AI</p>
            <p className="text-sm font-bold uppercase tracking-widest text-black/70">Based in TamilNadu, India</p>
            <p className="text-sm font-bold uppercase tracking-widest text-black/70">Available To Work Worldwide</p>
          </div>

          <button 
            onClick={() => window.location.href = '#'} 
            className="flex items-center gap-2 font-black tracking-widest uppercase text-sm md:text-base hover:opacity-70 transition-opacity"
          >
            ✺ RADA AI ASSISTANT
          </button>
          
          <div className="flex gap-4">
            <a href="https://github.com/RAKSHEDHA" target="_blank" rel="noreferrer" className="p-4 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><FiGithub size={24}/></a>
            <a href="https://www.linkedin.com/in/rakshedha" target="_blank" rel="noreferrer" className="p-4 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><FiLinkedin size={24}/></a>
            <a href="https://medium.com/@rakshecode" target="_blank" rel="noreferrer" className="p-4 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm">M</a>
          </div>
          
          <a 
            href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=rakshedhab@gmail.com&subject=Let's%20Connect&body=Hi%20Rakshedha,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you." 
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 border-2 border-black font-black uppercase text-xs tracking-[0.15em] hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            Let's Talk →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;