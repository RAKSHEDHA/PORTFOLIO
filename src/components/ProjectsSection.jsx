import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
  {
    number: '01',
    category: 'Agentic AI · Legal Tech',
    name: 'Legal Counsel AI',
    shortDescription: 'Enterprise-grade, production-ready AI agent workspace designed for corporate contract negotiation, risk mitigation analysis, and human-in-the-loop legal redlining.',
    fullDescription: 'Built on an asynchronous LangGraph.js architecture, this system orchestrates multiple specialized AI agents with memory state. Feature set includes multi-modal file parsing, automated risk detection, secure human-in-the-loop authorization interlocks via Model Context Protocol (MCP), and S3-compatible cloud storage integration.',
    techStack: 'LangGraph.js, Next.js, OpenAI GPT-4o-mini, Prisma, PostgreSQL, Docker, AWS S3/Cloudflare R2.',
    githubUrl: 'https://github.com/RAKSHEDHA/Legal-Counsel-AI',
    liveUrl: 'https://legal-counsel-ai.vercel.app/',
    blogUrl: 'https://medium.com/@rakshecode/building-legal-counsel-ai-an-enterprise-multi-agent-platform-for-contract-analysis-and-a4451a972a70',
    previewImage: '/image3/project1.png',
  },
  {
    number: '02',
    category: 'Multi-Agent · RAG Engine',
    name: 'DevSeek',
    shortDescription: 'A specialized, multi-agent search and synthesis engine engineered exclusively for software development and technical research.',
    fullDescription: 'Implementing a custom RAG architecture, DevSeek directly queries authoritative developer domains (e.g., GitHub, MDN, Dev.to). The system uses a parallelized multi-agent workflow powered by Google Gemini 1.5 Pro to bypass SEO low-signal content and stream context-aware, highly technical resolutions to client queries.',
    techStack: 'Next.js, Google Gemini 1.5 Pro, Exa AI, Tailwind CSS, React Query.',
    githubUrl: 'https://github.com/RAKSHEDHA/DEVSEEK',
    liveUrl: 'https://devseek-smoky.vercel.app/',
    blogUrl: 'https://medium.com/@rakshecode/building-devseek-an-ai-powered-engineering-intelligence-engine-for-developers-e7f3f32b170a',
    previewImage: '/image3/project2.png',
  },
  {
    number: '03',
    category: 'DevSecOps · CI/CD Security',
    name: 'ZeroTrust PR',
    shortDescription: 'Enterprise-grade, autonomous security auditing tool that shifts application security left within the CI/CD pipeline.',
    fullDescription: "Orchestrating the GitHub REST API and Google's Gemini 1.5 Pro reasoning engine, ZeroTrust PR ingests raw pull request diffs and enforces strict Zod validation schemas. It deterministically hunts and visually identifies critical OWASP Top 10 vulnerabilities (e.g., SQLi, XSS, hardcoded secrets) prior to merge.",
    techStack: 'Next.js, Vercel AI SDK, Gemini 1.5 Pro, Zod, GitHub API, Tailwind CSS.',
    githubUrl: 'https://github.com/RAKSHEDHA/ZeroTrustPR',
    liveUrl: 'https://zero-trust-pr.vercel.app/',
    blogUrl: 'https://medium.com/@nadummy17/building-zerotrust-pr-an-ai-powered-security-auditor-for-github-pull-requests-4411830defb8',
    previewImage: '/image3/project3.png',
  },
];

const ProjectCard = ({ project, index, total, progress }) => {
  // Cards shrink slightly as they get buried, but stay 100% solid!
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      className="sticky w-full flex items-start justify-center"
      style={{
        // Lock to the top of the screen (adjusting for navbar) and stagger them
        top: `calc(12vh + ${index * 30}px)`,
        // Create scroll padding: last card doesn't need extra scrolling height
        height: index === total - 1 ? 'auto' : '100vh',
        paddingBottom: index === total - 1 ? '10vh' : '0'
      }}
    >
      <motion.article
        style={{ scale }} // Removed opacity here so it stays solid!
        className="origin-top flex flex-col gap-4 rounded-[32px] border-2 border-black bg-white p-5 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] w-[96%] max-w-5xl h-[75vh] min-h-[480px] max-h-[700px]"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-1 gap-3 min-w-0">
            <div
              className="shrink-0 font-black text-black leading-none"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)' }}
            >
              {project.number}
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <span
                className="font-light uppercase tracking-[0.2em] text-black/60"
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.85rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-semibold uppercase text-black leading-tight"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}
              >
                {project.name}
              </h3>
              <p className="text-sm text-black/75 leading-relaxed line-clamp-2">
                {project.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end lg:self-start shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-black px-3.5 py-2 text-xs font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                GitHub
              </a>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-black bg-black px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-white hover:text-black"
            >
              Live Demo
            </a>
            <a
              href={project.blogUrl && project.blogUrl !== '#' ? project.blogUrl : project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border-2 border-black px-3.5 py-2 text-xs font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              Blog
            </a>
          </div>
        </div>

        <div className="grid flex-1 gap-4 min-h-0 lg:grid-cols-[0.95fr_1.05fr] mt-2">
          <div className="flex flex-col gap-4 min-h-0 justify-between">
            <p className="text-sm text-black/80 leading-relaxed overflow-y-auto pr-2 scrollbar-hide">
              {project.fullDescription}
            </p>
            <div className="bg-black/5 p-4 rounded-2xl border border-black/10">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-black/60">
                Tech Stack
              </p>
              <p className="text-sm text-black/90 font-medium leading-relaxed">
                {project.techStack}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border-2 border-black bg-[#f5f5f5] h-full min-h-[200px]">
            <img
              src={project.previewImage}
              alt={`${project.name} preview`}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const gridBackgroundStyle = {
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
  };

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none" style={gridBackgroundStyle} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mx-auto mb-16 sm:mb-20 flex w-fit flex-col items-center">
          <h2
            className="relative z-10 text-center font-black uppercase tracking-tight leading-none text-black"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' }}
          >
            <span className="bg-[#dff6e3] px-3 rounded-sm">PROJECTS</span>
          </h2>
          <div className="mt-3 h-[3px] w-2/3 bg-[#dff6e3]" />
        </div>
      </motion.div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress} 
          />
        ))}
      </div>

      <div className="relative z-10 mt-16 flex justify-center">
        <a
          href="https://github.com/RAKSHEDHA"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border-2 border-black bg-black px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white hover:text-black hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
        >
          Explore More on GitHub
        </a>
      </div>
    </section>
  );
};

export default ProjectsSection;