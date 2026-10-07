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

const ACHIEVEMENTS = [
  {
    number: '01',
    title: '1st Prize — Paper Presentation',
    category: 'Achievement',
    description:
      "Won 1st Prize for a paper presentation at PORT '26 National Symposium, Sona College of Technology."
  },
  {
    number: '02',
    title: 'Cloud Computing Club Captain',
    category: 'Leadership • 2026',
    description:
      'Led the Cloud Computing Club and supported the planning and execution of technical events, coordinating activities and student participation.'
  },
  {
    number: '03',
    title: 'Google Student Ambassador',
    category: 'Leadership • Student Program',
    description:
      'Reached 4,000+ students across departments through seminars, quizzes, hackathons, classroom outreach, and student communities.'
  },
  {
    number: '04',
    title: 'AWS Student Builder Campus Leader',
    category: 'Leadership • Student Program',
    description:
      'Reached 2,000+ students through campus outreach, events, demonstrations, and student engagement activities while working toward a company-set registration target.'
  },
  {
    number: '05',
    title: 'Python Development Intern',
    category: 'Infosys Springboard • Remote',
    description:
      'Contributed to a skill-matching platform for freelance services as part of a 20-member team, working across frontend and backend components and supporting integration, troubleshooting, deployment, and final presentation.'
  },
  {
    number: '06',
    title: 'Open Source Contributor',
    category: 'GirlScript Summer of Code • 2024–2025',
    description:
      'Contributed to multiple open-source projects by identifying issues, implementing fixes and enhancements, submitting pull requests, and collaborating with project maintainers.'
  },
  {
    number: '07',
    title: 'AI & Machine Learning Intern',
    category: 'IBM SkillsBuild • Remote',
    description:
      'Worked on practical machine learning applications using Python and explored model evaluation and interactive demonstrations through hands-on project work.'
  },
  {
    number: '08',
    title: 'Best Co-Curricular Activities Award',
    category: 'Recognition • 2025 & 2026',
    description:
      'Recognized for consistent participation and contribution to co-curricular activities and student initiatives at Hindustan College of Technology.'
  },
  {
    number: '09',
    title: 'Department Recognition',
    category: 'Recognition • 2026',
    description:
      'Received department recognition for contributions across multiple student leadership and ambassador programs.'
  },
  {
    number: '10',
    title: 'Google UX Design Professional Certificate',
    category: 'Certification • Coursera',
    description:
      'Completed professional training covering user research, user-centered design, wireframing, prototyping, usability testing, and UX design principles.'
  },
];

const AchievementsSection = () => {
  return (
    <section
      id="achievements"
      className="relative z-10 w-full bg-white px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 overflow-hidden"
    >

      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <FadeIn y={40}>
          <h2
            className="text-center font-black uppercase tracking-tighter leading-none mb-16 sm:mb-20 text-black"
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
          >
            <span className="bg-[#dff6e3] rounded-sm px-2">
              ACHIEVEMENTS
            </span>
            <br />
            <span className="text-gray-400">&amp; LEADERSHIP</span>
          </h2>
        </FadeIn>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">

          {ACHIEVEMENTS.map((item, index) => (
            <FadeIn
              key={item.number}
              y={30}
              delay={index * 0.08}
            >
              <div
                className="
                  h-full flex flex-col p-8 sm:p-9
                  bg-white
                  border border-black
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                  hover:-translate-y-2
                  hover:-translate-x-1
                  transition-all duration-300
                  group
                "
              >

                {/* Number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="font-black text-black/20 text-6xl md:text-7xl leading-none group-hover:text-black transition-colors duration-300">
                    {item.number}
                  </div>

                  <span className="text-[10px] md:text-xs font-black tracking-[0.15em] uppercase border border-black px-3 py-1">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-black uppercase text-black text-xl md:text-2xl leading-tight mb-4 tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-black/70 text-sm md:text-base font-medium leading-relaxed mt-auto">
                  {item.description}
                </p>

                {/* Bottom Line */}
                <div className="w-0 h-[3px] bg-black mt-8 group-hover:w-full transition-all duration-500 ease-out" />

              </div>
            </FadeIn>
          ))}

        </div>

        {/* Bottom Statement */}
        <FadeIn y={20} delay={0.2}>
          <div className="mt-20 flex justify-center">
            <div className="max-w-3xl text-center border-t-2 border-black pt-8">
              <p className="text-lg md:text-xl font-bold text-black leading-relaxed">
                Building experience across{' '}
                <span className="bg-[#dff6e3] px-1">
                  product, business analysis, operations,
                </span>{' '}
                and technology through internships, student leadership,
                open-source contribution, and hands-on projects.
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default AchievementsSection;