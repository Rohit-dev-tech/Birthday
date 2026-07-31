import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

import bestPhotoImg from '../assets/best_photo_ending.jpeg';

const Ending = () => {
  const heartRef = useRef(null);

  const handleHeartsExplosion = () => {
    // 1. Spawning multiple confetti heart blasts!
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#ff8fa3', '#c084fc', '#ff4d6d', '#ff758f']
    };

    confetti({
      ...defaults,
      particleCount: 80,
      scalar: 1.2,
      shapes: ['heart']
    });

    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 0.75
    });

    // Cascade second wave after a brief delay
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 100,
        scalar: 1.5,
        shapes: ['heart']
      });
    }, 200);

    // 2. Slow Audio volume fade-out using GSAP (representing movie credits ending)
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      gsap.to(audioElement, {
        volume: 0,
        duration: 5,
        ease: "power1.out",
        onComplete: () => {
          audioElement.pause();
        }
      });
    }
  };

  return (
    <section className="min-h-screen w-full relative py-24 px-4 md:px-8 bg-[#030304] overflow-hidden flex flex-col items-center justify-center">
      {/* Pink glow under center photo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full radial-glow-pink opacity-15 -z-10" />

      {/* Main Container */}
      <div className="max-w-3xl w-full flex flex-col items-center text-center gap-12 select-none z-10">
        
        {/* The Best Photo Frame - Slow Zoom */}
        <div className="glass-card p-6 rounded-3xl border border-white/5 shadow-2xl w-80 md:w-96 aspect-[3/4] flex flex-col justify-between overflow-hidden relative">
          {/* Subtle zoom animation container */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-[82%] rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center items-center relative overflow-hidden"
          >
            <img src={bestPhotoImg} alt="Our Best Photo" className="w-full h-full object-cover" />
          </motion.div>
          
          <div className="text-center font-handwritten text-xl text-white/95 mt-4">
            Forever & Always...
          </div>
        </div>

        {/* Closing text message */}
        <div className="flex flex-col gap-4 max-w-xl">
          <h3 className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed italic">
            "Thank you for choosing me every single day."
          </h3>
          <h2 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-romantic-pink via-white to-romantic-purple tracking-wide leading-tight mt-2 drop-shadow">
            Happy Birthday, My Love.
          </h2>
          <p className="text-white/40 text-xs font-sans tracking-widest uppercase font-semibold mt-4">
            Here's to forever and all the chapters we've yet to write.
          </p>
        </div>

        {/* Big Glowing Heart Button */}
        <div className="flex flex-col items-center gap-2 mt-4 relative">
          <motion.button
            ref={heartRef}
            onClick={handleHeartsExplosion}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-romantic-pink to-romantic-purple flex items-center justify-center text-white text-3xl shadow-[0_0_35px_rgba(255,143,163,0.5)] border-2 border-white/20 active:shadow-inner cursor-none clickable"
            aria-label="Trigger hearts explosion"
          >
            <FaHeart className="animate-[pulse_1.2s_infinite]" />
          </motion.button>
          
          <span className="text-[10px] text-white/40 font-sans tracking-widest uppercase font-bold animate-pulse">
            Click to Celebrate
          </span>
        </div>

      </div>
    </section>
  );
};

export default Ending;
