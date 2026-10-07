import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function Experience() {
  const containerRef = useRef(null);

  const timelineData = [
    {
      date: "NOW",
      role: "Exploring Product & Business",
      company: "Product • Business Analysis • Operations",
      desc: "Building practical experience in business analysis, product thinking, user research, data-driven problem solving, and project execution while developing a portfolio of real-world case studies."
    },
    {
      date: "JUL 2026 — AUG 2026",
      role: "AWS Student Builder Campus Leader",
      company: "Amazon Web Services • Student Program",
      desc: "Led a 6-week campus initiative across technical departments, reaching 2,000+ students through classroom outreach, tabling activities, quizzes, and a hackathon. Coordinated with faculty and student communities while working toward a company-set target of 300 AWS Builder Center registrations."
    },
    {
      date: "JUL 2025 — DEC 2025",
      role: "Google Student Ambassador",
      company: "Google • Student Program",
      desc: "Led student engagement activities across all departments, reaching 4,000+ students through seminars, quizzes, hackathons, classroom outreach, and student communities. Guided approximately 3,000 students through the Gemini student-plan process and created reusable walkthroughs after identifying recurring onboarding questions."
    },
    {
      date: "FEB 2026 — APR 2026",
      role: "Python Development Intern",
      company: "Infosys Springboard • Remote",
      desc: "Contributed to a skill-matching platform for freelance services as part of a 20-member team, working across frontend and backend components. Collaborated on requirements, development, integration, troubleshooting, deployment, and final product presentation."
    },
    {
      date: "2024 — 2025",
      role: "Open Source Contributor",
      company: "GirlScript Summer of Code • Student Program",
      desc: "Participated in two consecutive open-source programs, contributing to multiple GitHub repositories by identifying issues, implementing fixes and enhancements, submitting pull requests, and adapting to different project requirements and codebases."
    },
    {
      date: "JAN 2024 — MAY 2024",
      role: "Microsoft Learn Student Ambassador",
      company: "Microsoft • Student Program",
      desc: "Conducted classroom sessions and a workshop introducing students to Microsoft Learn and certification opportunities, reaching approximately 200 students and contributing to 50 Microsoft Learn sign-ups."
    },
    {
      date: "SEP 2023 — JUN 2027",
      role: "B.Tech Information Technology",
      company: "Hindustan College of Technology",
      desc: "Final-year Information Technology student building a foundation across technology, business problem solving, data analysis, product thinking, and collaborative project execution."
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

  const lineHeight = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div
      id="experience"
      className="relative w-full min-h-screen bg-white py-32 overflow-hidden"
    >

      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 text-center mb-32">
        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase inline-block">
          MY JOURNEY <span className="text-gray-400">&amp;</span><br />
          <span className="bg-[#e8ece0] px-4 inline-block mt-2">
            EXPERIENCE
          </span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-10"
      >

        {/* Timeline Track */}
        <div className="absolute left-1/2 top-[30px] bottom-0 w-[4px] transform -translate-x-1/2 z-0">

          {/* Animated Timeline */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-black origin-top z-10 shadow-[0_0_12px_rgba(0,0,0,0.6)]"
            style={{ height: lineHeight }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] z-20" />
          </motion.div>

        </div>

        {/* Timeline Items */}
        <div className="flex flex-col w-full relative z-20">

          {timelineData.map((item, index) => {
            const isLast = index === timelineData.length - 1;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center w-full relative ${
                  isLast ? '' : 'mb-32'
                }`}
              >

                {/* LEFT SIDE */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-end text-right pr-10 md:pr-16">

                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black mb-2 leading-none">
                    {item.role}
                  </h3>

                  <span className="text-xl md:text-2xl font-black font-mono text-black mb-2">
                    {item.date}
                  </span>

                  <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                    {item.company}
                  </p>

                </div>

                {/* CENTER */}
                <div className="w-[4px] shrink-0" />

                {/* RIGHT SIDE */}
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