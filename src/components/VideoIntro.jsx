import React, { useState, useEffect, useRef } from 'react';

const VideoIntro = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [muted, setMuted] = useState(true);

  // Auto-play video when scrolling back to it
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // When the video comes into view, play it
          const video = videoRef.current;
          if (video) {
            video.currentTime = 0;
            video.play().catch(err => console.log('Autoplay prevented:', err));
            setHasPlayedOnce(false);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Snap-scroll logic
  useEffect(() => {
    let fired = false;

    const goToNext = () => {
      if (fired) return;
      fired = true;
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    const onWheel = (e) => {
      if (fired) return;
      if (e.deltaY <= 0) return;
      if (window.scrollY > 50) return;
      e.preventDefault();
      goToNext();
    };

    const onKey = (e) => {
      if (fired) return;
      if (window.scrollY > 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleVideoEnd = () => {
    setHasPlayedOnce(true);
    // Auto-scroll to the next page
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      const newMutedState = !muted;
      setMuted(newMutedState);
      video.muted = newMutedState;
    }
  };

  return (
    <section ref={sectionRef} id="video-intro" className="relative h-screen w-full overflow-hidden z-50">
      
      {/* Video background - Full screen, no overlays */}
      <video
        ref={videoRef}
        autoPlay={!hasPlayedOnce}
        muted={muted}
        playsInline
        onEnded={handleVideoEnd}
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Mute Toggle Button - Right side above Ask Rada button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="fixed bottom-28 right-8 z-[200] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
    </section>
  );
};

export default VideoIntro;