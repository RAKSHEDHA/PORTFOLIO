import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: "software",
      title: "SOFTWARE SYSTEMS",
      angle: 0,
      proficiencies: [
        {
          level: "EXPERT",
          desc: "Deep, hands-on production experience. Leading projects and architecture.",
          score: "90%",
          groups: [
            { name: "Backend Development", tech: "Python, Go, REST / GraphQL APIs" },
            { name: "System Architecture", tech: "Microservices, Distributed Systems" }
          ]
        },
        {
          level: "ADVANCED",
          desc: "Building complex features. Proficient in best practices and scaling.",
          score: "75%",
          groups: [
            { name: "Cloud & DevOps", tech: "AWS, GCP, Docker, CI/CD Pipelines" },
            { name: "Database Design", tech: "PostgreSQL, MongoDB, Redis" }
          ]
        },
        {
          level: "PROFICIENT",
          desc: "Solid practical experience. Working independently on tasks.",
          score: "60%",
          groups: [
            { name: "Frontend Development", tech: "React.js, Tailwind CSS, Next.js" }
          ]
        }
      ]
    },
    {
      id: "ai-eng",
      title: "AI ENGINEERING",
      angle: 90,
      proficiencies: [
        {
          level: "EXPERT",
          desc: "Deep expertise in model architecture, training, and deployment.",
          score: "95%",
          groups: [
            { name: "Model Development", tech: "PyTorch, TensorFlow, Keras" },
            { name: "NLP Systems", tech: "Transformers, LLM Fine-tuning" }
          ]
        },
        {
          level: "ADVANCED",
          desc: "Strong capability in optimizing machine learning solutions.",
          score: "80%",
          groups: [
            { name: "Computer Vision", tech: "OpenCV, YOLO, Image Processing" },
            { name: "Vector Search", tech: "Pinecone, Milvus, FAISS" }
          ]
        },
        {
          level: "PROFICIENT",
          desc: "Practical experience integrating AI models into production.",
          score: "65%",
          groups: [
            { name: "MLOps", tech: "Model Monitoring, Data Pipelines" }
          ]
        }
      ]
    },
    {
      id: "ai-prod",
      title: "AI PRODUCT DEV",
      angle: 180,
      proficiencies: [
        {
          level: "EXPERT",
          desc: "Transforming AI capabilities into intuitive user experiences.",
          score: "90%",
          groups: [
            { name: "Rapid Prototyping", tech: "Streamlit, Gradio, Vercel" },
            { name: "AI Interaction", tech: "Conversational UI, Agentic UX" }
          ]
        },
        {
          level: "ADVANCED",
          desc: "Skilled in measuring AI feature performance.",
          score: "80%",
          groups: [
            { name: "Product Analytics", tech: "A/B Testing, Feature Flags" }
          ]
        },
        {
          level: "PROFICIENT",
          desc: "Capable of designing comprehensive user workflows.",
          score: "70%",
          groups: [
            { name: "User Research", tech: "Journey Mapping, Feedback Loops" }
          ]
        }
      ]
    },
    {
      id: "ai-tools",
      title: "AI TOOL MASTERY",
      angle: 270,
      proficiencies: [
        {
          level: "EXPERT",
          desc: "Advanced foundation models and chaining architectures.",
          score: "95%",
          groups: [
            { name: "LLM Orchestration", tech: "LangChain, OpenAI API" },
            { name: "Prompt Engineering", tech: "Few-shot, CoT, System Prompts" }
          ]
        },
        {
          level: "ADVANCED",
          desc: "Skilled in augmenting AI with knowledge and tools.",
          score: "85%",
          groups: [
            { name: "Retrieval Systems", tech: "RAG Architecture, Embeddings" }
          ]
        },
        {
          level: "PROFICIENT",
          desc: "Experience deploying agents and monitoring outputs.",
          score: "70%",
          groups: [
            { name: "Agentic Workflows", tech: "AutoGPT, Tool Integration" }
          ]
        }
      ]
    }
  ];

  return (
    <div id="skills" className="relative w-full min-h-screen bg-white py-24 overflow-hidden flex flex-col items-center">
      
      <style>{`
        @keyframes sweepLine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          100% { transform: rotate(-360deg); }
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* TITLE SECTION */}
      <div className="relative z-10 text-center flex flex-col items-center mb-8 w-full">
        <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase inline-block leading-tight">
          TECH <span className="bg-[#e8ece0] px-4 inline-block">STACK</span>
        </h2>
        
        {/* THE SWEEPING LIGHT LINE */}
        <div className="w-full max-w-sm h-[3px] bg-gray-200 overflow-hidden relative mt-6 rounded-full">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.8), #000, rgba(0,0,0,0.8), transparent)',
              animation: 'sweepLine 2.5s linear infinite'
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        
        {/* --- ORBITING GLOBE SECTION --- */}
        <div className="relative w-full flex justify-center items-center h-[600px]">
            
            {/* --- FLOATING TEXT: LEFT TOP --- */}
            <div className="hidden lg:flex flex-col absolute top-10 left-0 max-w-[260px] z-10 pointer-events-none">
              <p className="text-xs font-black tracking-[0.2em] text-gray-400 mb-2">
                // GET TO KNOW MY SKILLS
              </p>
              <p className="text-sm font-medium text-gray-600 leading-relaxed border-l-2 border-black pl-4">
                Explore the technologies and frameworks that power my engineering stack. Click the orbiting nodes to initialize detailed proficiency metrics.
              </p>
            </div>

            {/* --- FLOATING TEXT: RIGHT BOTTOM (Moved higher using bottom-40) --- */}
            <div className="hidden lg:flex flex-col absolute bottom-40 right-0 max-w-[260px] z-10 text-right items-end pointer-events-none">
              <p className="text-xs font-black tracking-[0.2em] text-gray-400 mb-2">
                // CONTINUOUS EVOLUTION
              </p>
              <p className="text-sm font-medium text-gray-600 leading-relaxed border-r-2 border-black pr-4">
                Adaptability is the ultimate metric. My toolset continuously expands to integrate the latest breakthroughs in AI and scalable system architecture.
              </p>
            </div>

            {/* The Central Black Globe */}
            <div className="absolute w-40 h-40 bg-black rounded-full shadow-[0_0_30px_rgba(0,0,0,0.2)] z-20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 border-[1px] border-white/20 rounded-full"></div>
                <div className="absolute w-full h-[1px] bg-white/20"></div>
                <div className="absolute h-full w-[1px] bg-white/20"></div>
                
                <span className="text-white font-mono text-xs font-bold tracking-[0.1em] z-10 text-center leading-normal">
                  CORE<br/>SKILLS
                </span>
            </div>

            {/* The Orbit Ring */}
            <div className="absolute w-[450px] h-[450px] border-[2px] border-dashed border-black/10 rounded-full z-0 pointer-events-none"></div>

            {/* Orbiting Category Nodes */}
            {categories.map((cat) => (
              <div 
                key={cat.id}
                className="absolute top-1/2 left-1/2 z-30 pointer-events-none" 
                style={{
                  width: '0px', height: '0px',
                  animation: `spin 30s linear infinite`,
                }}
              >
                <div className="absolute pointer-events-auto" style={{ transform: `rotate(${cat.angle}deg) translateX(225px)` }}>
                  <div className="absolute -top-[56px] -left-[56px] w-28 h-28" style={{ animation: `reverse-spin 30s linear infinite` }}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className="w-full h-full bg-white border-[2px] border-black text-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all group cursor-pointer flex flex-col items-center justify-center p-3"
                    >
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-center leading-tight group-hover:scale-105 transition-transform">
                        {cat.title}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* --- COMPACT 3-COLUMN MODAL --- */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm p-3 overflow-y-auto"
            onClick={() => setActiveCategory(null)} 
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className="bg-white border-[3px] border-black p-6 md:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-4xl w-full relative my-6"
              onClick={(e) => e.stopPropagation()} 
            >
              <button 
                onClick={() => setActiveCategory(null)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center border-2 border-black text-black hover:bg-black hover:text-white transition-colors font-bold z-10 text-xs"
              >
                ✕
              </button>

              <div className="mb-8 border-b-2 border-black pb-3 pr-8">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black flex items-center gap-3 leading-tight">
                  <span className="text-xl text-gray-400">/</span> {activeCategory.title}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeCategory.proficiencies.map((prof, idx) => (
                  <div key={idx} className="flex flex-col h-full bg-gray-50 border-[1px] border-black/10 p-5 rounded-sm">
                    
                    <div className="mb-3">
                      <h4 className="text-lg font-black tracking-widest text-black uppercase leading-tight">
                        [ {prof.level} ]
                      </h4>
                      <p className="text-xs text-gray-600 mt-2 min-h-[50px] leading-relaxed">
                        {prof.desc}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 flex-grow mb-6">
                      {prof.groups.map((group, gIdx) => (
                        <div key={gIdx} className="border-[1px] border-black/20 bg-white rounded-full px-4 py-2.5 shadow-sm hover:border-black transition-colors">
                          <p className="text-[10px] font-bold text-black uppercase tracking-wider">{group.name}</p>
                          <p className="text-xs text-gray-600 font-medium mt-0.5">{group.tech}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-black/10">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Proficiency</span>
                        <span className="text-xs font-black text-black">{prof.score}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: prof.score }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                          className="h-full bg-black"
                        ></motion.div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}