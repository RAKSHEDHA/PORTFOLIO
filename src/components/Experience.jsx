import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function Experience() {
  const containerRef = useRef(null);

  const timelineData = [
    {
      date: "NOW",
      role: "Learning & Growing",
      company: "Self-Development",
      desc: "Continuously exploring new technologies, pushing limits daily and building personal projects that challenge and inspire."
    },
    {
      date: "SEP 2025 — APR 2026",
      role: "Google Student Ambassador",
      company: "Google • Part-time",
      desc: "Evangelizing Google technologies, hosting workshops, and fostering a vibrant developer community on campus."
    },
    {
      date: "FEB 2026 — MAR 2026",
      role: "Python Intern",
      company: "Infosys Springboard • Remote",
      desc: "Contributed to the design and implementation of a Web Platform for Freelance Services and Skill Matching."
    },
    {
      date: "JUL 2025 — OCT 2025",
      role: "Open Source Contributor",
      company: "GirlScript Summer of Code • Remote",
      desc: "Actively contributed to open-source repositories under the GSSoC'25 program, focusing on collaborative development."
    },
    {
      date: "JUN 2025 — JUL 2025",
      role: "AI & ML Intern",
      company: "IBM • Remote",
      desc: "Engaged in practical, hands-on application of machine learning concepts, including model training, in collaboration with AICTE and IBM SkillsBuild."
    },
    {
      date: "SEP 2023 — JUN 2027",
      role: "B.Tech Information Technology",
      company: "Dhirajlal Gandhi College of Technology",
      desc: "Currently in final year. Building a strong academic foundation in software engineering, algorithms, and complex problem-solving."
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 75%"] 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div id="experience" className="relative w-full min-h-screen bg-white py-32 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="relative z-10 text-center mb-32">
        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase inline-block">
          MY CAREER <span className="text-gray-400">&amp;</span><br/>
          <span className="bg-[#e8ece0] px-4 inline-block mt-2">EXPERIENCE</span>
        </h2>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-10">
        
        {/* THE INVISIBLE TRACK */}
        <div className="absolute left-1/2 top-[30px] bottom-0 w-[4px] transform -translate-x-1/2 z-0">
            
            {/* THE ANIMATED THICK BLACK LINE WITH GLOW */}
            <motion.div 
              className="absolute top-0 left-0 w-full bg-black origin-top z-10 shadow-[0_0_12px_rgba(0,0,0,0.6)]" 
              style={{ height: lineHeight }}
            >
                {/* THE DOT: Single solid black circle */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] z-20"></div>
            </motion.div>
            
        </div>

        {/* TIMELINE ITEMS */}
        <div className="flex flex-col w-full relative z-20">
          {timelineData.map((item, index) => {
            const isLast = index === timelineData.length - 1;
            
            return (
              <div key={index} className={`flex flex-col md:flex-row items-center w-full relative ${isLast ? '' : 'mb-32'}`}>
                
                {/* LEFT SIDE: Vertically stacked and right-aligned */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-end text-right pr-10 md:pr-16">
                  {/* Job Title */}
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black mb-2 leading-none">
                    {item.role}
                  </h3>
                  {/* Date (Moved directly under the title) */}
                  <span className="text-xl md:text-2xl font-black font-mono text-black mb-2">
                    {item.date}
                  </span>
                  {/* Company */}
                  <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                    {item.company}
                  </p>
                </div>

                {/* CENTER SPACER */}
                <div className="w-[4px] shrink-0"></div>

                {/* RIGHT SIDE: Description */}
                <div className="w-full md:w-1/2 pl-10 md:pl-16">
                  <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-md bg-gray-50 p-6 border border-gray-100">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}