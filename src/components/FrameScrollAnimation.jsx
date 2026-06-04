import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FrameScrollAnimation = ({ frameCount = 92 }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const images = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 1. Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Smooth Easing (Spring) for the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. Transform Progress to Frame Index
  const frameIndex = useTransform(smoothProgress, [0, 0.9], [0, frameCount - 1]);

  // 4. Anti-Gravity 3D Effects
  // Floating motion
  const y = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [0, 15, 0]);
  const rotateY = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, -10, 10, 0]);
  const scale = useTransform(smoothProgress, [0, 0.8, 0.95], [1, 1.05, 1.2]);
  
  // Depth effect (Z-axis translation)
  const z = useTransform(smoothProgress, [0, 1], [0, 100]);

  // Preloading Logic
  useEffect(() => {
    let loadedCount = 0;
    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, "0");
        // Match Hero component image path
        img.src = `/images/ezgif-frame-${frameNumber}.png`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
          if (loadedCount === frameCount) {
            setLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === frameCount) setLoaded(true);
        };
        images.current.push(img);
      }
    };
    preloadImages();
  }, [frameCount]);

  // Canvas Rendering
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match Hero component
    canvas.width = 1933;
    canvas.height = 2012;

    const render = () => {
      const index = Math.round(frameIndex.get());
      const img = images.current[index];

      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Frame update loop
    const unsubscribe = frameIndex.on("change", render);

    return () => {
      unsubscribe();
    };
  }, [loaded, frameIndex]);

  // Final Scene Transitions
  // Keep your face visible by setting opacity to [1, 1] instead of [1, 0]
  const opacity = useTransform(smoothProgress, [0.85, 0.95], [1, 1]);
  const blur = useTransform(smoothProgress, [0.85, 0.95], ["blur(0px)", "blur(0px)"]);

  // 👇 NEW: The Video-Style Text Reveal 👇
  // These animations trigger exactly as the head stops turning
  const textOpacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]); // Fades in
  const textY = useTransform(smoothProgress, [0.85, 0.95], [40, 0]);      // Slides up
  const lineWidth = useTransform(smoothProgress, [0.85, 0.95], ["0%", "100%"]); // Draws line

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-white" style={{ position: 'relative' }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-2000">
        
        {/* Loading Overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <div className="text-gray-700 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">
              Syncing Core Frames... {loadingProgress}%
            </div>
            <div className="w-1/4 h-[1px] bg-gray-200 overflow-hidden">
               <motion.div 
                 className="h-full bg-gray-800" 
                 style={{ width: `${loadingProgress}%` }}
               />
            </div>
          </div>
        )}

        {/* The Animated Frame (Full Screen Canvas) */}
        <motion.div
           style={{
             y,
             rotateX,
             rotateY,
             scale,
             z,
             opacity,
             filter: blur,
             transformStyle: "preserve-3d"
           }}
           className="relative w-full h-full overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            className="w-full max-w-6xl max-h-[100vh] object-contain mx-auto mix-blend-darken transform-gpu scale-125 md:scale-150 origin-top transition-transform"
          />
        </motion.div>

        {/* Global Cinematic Vibe */}
        <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-40" />
      </div>

      {/* EXACT VIDEO TEXT REVEAL OVERLAY */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between px-8 md:px-16 w-full h-full">

        {/* LEFT SIDE: Strictly constrained to 40% of the screen width */}
        <motion.div 
          style={{ opacity: 0, y: 0 }}
          className="flex flex-col justify-center text-black w-[45%] pl-4 mt-24 md:mt-32"
        >
          {/* Stacking the name keeps it massive without crossing into the center */}
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black uppercase leading-[0.85] tracking-tighter">
            <span className="block">RAKS</span>
            <span className="block">HEDHA</span>
          </h1>

          {/* The Animated Line */}
          <div className="my-4 md:my-6 w-full">
            <motion.div 
              style={{ width: lineWidth }}
              className="h-[4px] bg-black origin-left"
            />
          </div>

          <p className="text-sm md:text-lg tracking-[0.2em] font-bold uppercase whitespace-nowrap">
            AI & Software Engineer
          </p>
        </motion.div>

        {/* RIGHT SIDE: Strictly constrained to 30% of the screen width */}
        <motion.div 
          style={{ opacity: 0, y: 0 }}
          className="hidden md:block text-black font-medium text-right w-1/3 mt-24 md:mt-32 pr-4"
        >
          <p className="leading-relaxed text-2xl italic font-serif">
            Transforming complex data into intelligent solutions through scalable backend architecture and cutting-edge AI.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default FrameScrollAnimation;
