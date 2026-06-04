import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, y = 40, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, ease: 'easeOut', delay }}
  >
    {children}
  </motion.div>
);

// 1. Your Service Data with drafted descriptions
const SERVICES = [
  {
    number: '01',
    title: 'AI Product Engineering & Agent Development',
    description: 'Designing and deploying autonomous AI agents, fine-tuned LLMs, and intelligent workflows to automate complex business logic and enhance operational efficiency.',
  },
  {
    number: '02',
    title: 'Complex SaaS Architecture',
    description: 'Architecting scalable, secure, and highly available backend systems. Building robust APIs, managing databases, and orchestrating cloud infrastructure for enterprise SaaS.',
  },
  {
    number: '03',
    title: 'Advanced Front-End Web Dev & UI Design',
    description: 'Crafting pixel-perfect, cinematic user interfaces with React, Framer Motion, and Tailwind CSS. Bridging the gap between high-end design and flawless performance.',
  },
  {
    number: '04',
    title: 'Full Stack Web Development',
    description: 'Delivering end-to-end web solutions. From responsive client-side experiences to resilient server-side logic, ensuring seamless integration across the entire stack.',
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative z-10 w-full bg-white px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 overflow-hidden"
    >
      {/* --- BACKGROUND LIGHT GRID --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.5] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn y={40}>
          <h2
            className="text-center font-black uppercase tracking-tighter leading-none mb-16 sm:mb-20 text-black"
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
          >
            <span className="bg-[#dff6e3] rounded-sm">SERVICES</span>
          </h2>
        </FadeIn>

        {/* --- HORIZONTAL GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mb-20">
          {SERVICES.map((service, index) => (
            <FadeIn 
              key={service.number} 
              y={30} 
              delay={index * 0.1} // Staggered fade-in effect
            >
              <div className="h-full flex flex-col p-8 sm:p-10 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-1 transition-all duration-300 group">
                
                {/* Massive Number Typography */}
                <div className="font-black text-black/20 text-6xl md:text-7xl mb-6 group-hover:text-black transition-colors duration-300">
                  {service.number}
                </div>
                
                <h3 className="font-black uppercase text-black text-xl md:text-2xl leading-tight mb-4 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-black/70 text-sm md:text-base font-medium leading-relaxed mt-auto">
                  {service.description}
                </p>

                {/* Subtle bottom line decoration */}
                <div className="w-0 h-[3px] bg-black mt-8 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* --- CENTERED CALL TO ACTION BUTTON --- */}
        <FadeIn y={20}>
          <div className="flex justify-center">
            <a 
              href="#contact" // Link to your contact section
              className="inline-block px-12 py-5 border-2 border-black bg-white text-black font-black tracking-[0.2em] uppercase text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              GET SERVICE
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default ServicesSection;