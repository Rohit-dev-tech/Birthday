import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaMusic } from 'react-icons/fa';
import gsap from 'gsap';

const IntroScreen = ({ onStart, isMusicPlaying, setIsMusicPlaying }) => {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const texts = [
    "Hi Love ❤️",
    "I made something for you...",
    "A journey...",
    "Our journey."
  ];

  // Typing effect logic
  useEffect(() => {
    let timer;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentFullText = texts[textIndex];
      
      if (!isDeleting) {
        // Typing characters
        setTypedText(currentFullText.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentFullText.length) {
          // Pause at the end of typing
          timer = setTimeout(() => {
            isDeleting = true;
            type();
          }, 1800);
          return;
        }
      } else {
        // Deleting characters
        setTypedText(currentFullText.slice(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex++;
          
          if (textIndex < texts.length) {
            // Next phrase after a short delay
            timer = setTimeout(type, 500);
          } else {
            // Finished typing all phrases
            setShowButton(true);
            return;
          }
          return;
        }
      }

      const speed = isDeleting ? 30 : 70;
      timer = setTimeout(type, speed);
    };

    // Delay typing start to let stars blend in
    const startDelay = setTimeout(() => {
      type();
      setShowMusicPrompt(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(startDelay);
    };
  }, []);

  // Handle clicking "Begin Our Story"
  const handleBegin = () => {
    // If she hasn't enabled music, turn it on
    if (!isMusicPlaying) {
      setIsMusicPlaying(true);
    }

    // GSAP fly-in animation (zoom and fade out the overlay)
    const introTimeline = gsap.timeline({
      onComplete: onStart
    });

    introTimeline.to("#intro-content", {
      scale: 1.5,
      opacity: 0,
      duration: 1.5,
      ease: "power3.in"
    });

    introTimeline.to("#intro-overlay", {
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8");
  };

  return (
    <div
      id="intro-overlay"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial-gradient from-romantic-pink/5 via-transparent to-transparent pointer-events-none" />

      {/* Floating stardust indicator overlay */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] animate-[pulse_6s_infinite]" />

      <div id="intro-content" className="z-10 flex flex-col items-center text-center px-4 max-w-xl select-none">
        
        {/* Music Consent Tooltip (highly responsive) */}
        <AnimatePresence>
          {showMusicPrompt && !isMusicPlaying && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-12 glass-card px-4 py-2 rounded-full border border-romantic-pink/20 text-xs tracking-wider uppercase text-white/70 flex items-center gap-2 hover-glow-card"
            >
              <FaMusic className="text-romantic-pink animate-bounce" />
              <span>Enable audio for full experience</span>
              <button 
                onClick={() => setIsMusicPlaying(true)}
                className="ml-2 px-2 py-0.5 rounded bg-romantic-pink/20 hover:bg-romantic-pink text-white text-[10px] uppercase font-bold active:scale-95 transition-all clickable"
              >
                Turn On
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Heart Icon */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
          className="mb-8 text-romantic-pink drop-shadow-[0_0_15px_rgba(255,143,163,0.6)]"
        >
          <FaHeart className="text-4xl" />
        </motion.div>

        {/* Typing Text */}
        <div className="h-16 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-serif tracking-wide italic text-white/95">
            {typedText}
            <span className="inline-block w-[3px] h-6 bg-romantic-pink ml-1 animate-pulse">|</span>
          </h1>
        </div>

        {/* Begin Button */}
        <div className="h-20 mt-8 flex items-center justify-center">
          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onClick={handleBegin}
                className="glass-card hover:bg-white/5 border border-white/10 px-8 py-3.5 rounded-full text-sm font-semibold tracking-widest uppercase hover:text-romantic-pink hover:border-romantic-pink/50 hover:shadow-[0_0_25px_rgba(255,143,163,0.3)] transition-all duration-300 active:scale-95 flex items-center gap-3 clickable"
              >
                <span>Begin Our Story</span>
                <FaHeart className="text-xs text-romantic-pink" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
