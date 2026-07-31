import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegHeart } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

import travelImg from '../assets/surprise/travel.jpeg';
import walksImg from '../assets/surprise/walks.jpg';
import selfieImg from '../assets/surprise/selfie.jpeg';
import laughImg from '../assets/surprise/laugh.jpeg';
import centerpieceImg from '../assets/centerpiece_best.jpeg';

const FinalSurprise = ({ onComplete }) => {
  const [wishMade, setWishMade] = useState(false);
  const [showCenterPhoto, setShowCenterPhoto] = useState(false);
  const flameRef = useRef(null);
  const cakeLeftRef = useRef(null);
  const cakeRightRef = useRef(null);
  const surprisePhotosRef = useRef(null);

  const handleMakeWish = () => {
    setWishMade(true);

    // 1. Confetti explosion
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff8fa3', '#c084fc', '#fbbf24']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff8fa3', '#c084fc', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. GSAP animation for the candle blowout & cake splitting
    const tl = gsap.timeline();

    // Blow flame away
    tl.to(flameRef.current, {
      y: -50,
      x: 20,
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Split cake open
    tl.to([cakeLeftRef.current, cakeRightRef.current], {
      x: (i) => i === 0 ? -120 : 120,
      opacity: 0.3,
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.2");

    // Scatter photos out of the cake
    tl.fromTo(".surprise-photo-item", 
      { scale: 0, opacity: 0, rotation: () => Math.random() * 40 - 20 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.3,
        duration: 1,
        ease: "back.out(1.5)"
      }
    );

    // Fade into the ultimate centerpiece photo
    tl.to({}, { duration: 1.5 }); // pause
    tl.call(() => {
      setShowCenterPhoto(true);
      if (onComplete) {
        // Trigger completion callback to unlock ending section
        setTimeout(onComplete, 3000);
      }
    });
  };

  const surprisePhotos = [
    { id: 1, title: "Our Travels", path: travelImg, style: "left-[5%] top-[15%] rotate-[-12deg]" },
    { id: 2, title: "Late Night Walks", path: walksImg, style: "right-[5%] top-[12%] rotate-[10deg]" },
    { id: 3, title: "Silly Selfies", path: selfieImg, style: "left-[8%] bottom-[15%] rotate-[8deg]" },
    { id: 4, title: "Laughing Together", path: laughImg, style: "right-[8%] bottom-[10%] rotate-[-6deg]" }
  ];

  return (
    <section className="min-h-screen w-full relative py-24 px-4 md:px-8 bg-[#020203] overflow-hidden flex flex-col items-center justify-center">
      {/* Background stardust */}
      <div className="absolute inset-0 bg-radial-gradient from-romantic-pink/5 via-transparent to-transparent pointer-events-none" />

      {/* Title Header */}
      {!wishMade && (
        <div className="text-center mb-16 max-w-xl z-10">
          <span className="text-romantic-pink font-sans font-semibold tracking-widest text-xs uppercase animate-pulse">
            Make A Wish
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-pink text-white">
            Make A Wish ❤️
          </h2>
          <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
            Close your eyes, think of us, and click the candle to blow out the flame.
          </p>
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="relative w-full max-w-4xl h-[450px] flex items-center justify-center select-none z-10">
        
        {/* Birthday Cake Container */}
        {!showCenterPhoto && (
          <div className="relative flex items-end justify-center w-80 h-80 z-20">
            {/* Candle with Flame (sitting above cake split) */}
            {!wishMade && (
              <div 
                ref={flameRef}
                onClick={handleMakeWish}
                className="absolute bottom-28 w-6 h-12 flex flex-col items-center cursor-none z-30"
              >
                {/* Glowing Candle Flame */}
                <div className="w-4 h-6 rounded-full bg-amber-400 shadow-[0_0_20px_#fbbf24] animate-[bounce_0.6s_infinite] origin-bottom" />
                {/* Wick */}
                <div className="w-[2px] h-3 bg-zinc-600" />
                <span className="text-[7px] text-white/50 tracking-wider uppercase font-bold mt-1 bg-black/40 px-1 rounded animate-pulse">
                  Click to Blow
                </span>
              </div>
            )}

            {/* Left half of cake */}
            <div ref={cakeLeftRef} className="w-1/2 h-24 bg-[#1e1f29] rounded-l-2xl border-l border-y border-white/5 shadow-2xl relative overflow-hidden flex items-center justify-end pr-2">
              <div className="w-4 h-24 bg-romantic-pink opacity-20 absolute left-2 top-0" />
              <div className="w-2 h-24 bg-romantic-purple opacity-20 absolute left-8 top-0" />
              {/* Frosting drips */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-[#ff8fa3] rounded-b-lg opacity-85" />
            </div>

            {/* Right half of cake */}
            <div ref={cakeRightRef} className="w-1/2 h-24 bg-[#1e1f29] rounded-r-2xl border-r border-y border-white/5 shadow-2xl relative overflow-hidden flex items-center pl-2">
              <div className="w-4 h-24 bg-romantic-pink opacity-20 absolute right-2 top-0" />
              <div className="w-2 h-24 bg-romantic-purple opacity-20 absolute right-8 top-0" />
              {/* Frosting drips */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-[#ff8fa3] rounded-b-lg opacity-85" />
            </div>
            
            {/* Candle body */}
            <div className="absolute bottom-24 w-2 h-8 bg-zinc-400 rounded-t-sm" />
          </div>
        )}

        {/* Scattered Surprise Photos (appear when cake opens) */}
        {!showCenterPhoto && (
          <div ref={surprisePhotosRef} className="absolute inset-0 w-full h-full pointer-events-none">
            {surprisePhotos.map((photo) => (
              <div
                key={photo.id}
                className={`surprise-photo-item absolute glass-card p-3 rounded-lg border border-white/10 bg-white/5 shadow-2xl w-48 aspect-[4/3] flex flex-col justify-between ${photo.style}`}
              >
                {/* Surprise Photo Box */}
                <div className="w-full h-[80%] rounded-md bg-white/5 border border-white/10 flex flex-col justify-center items-center overflow-hidden">
                  <img src={photo.path} alt={photo.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-[10px] text-white/60 font-sans tracking-wide mt-2 text-center">
                  {photo.title}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Centerpiece Ultimate Zoom Photo */}
        <AnimatePresence>
          {showCenterPhoto && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="absolute glass-card p-6 rounded-3xl border border-white/10 w-80 md:w-96 aspect-[3/4] flex flex-col justify-between shadow-[0_0_50px_rgba(255,143,163,0.3)] z-50 bg-[#0a0a0f]"
            >
              {/* Centerpiece main box */}
              <div className="w-full h-[82%] rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center items-center relative overflow-hidden group">
                <img src={centerpieceImg} alt="Centerpiece Best" className="w-full h-full object-cover" />
              </div>
              <div className="text-center font-handwritten text-2xl text-white/95 mt-4">
                "Our Beautiful Lifetime... ❤️"
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default FinalSurprise;
