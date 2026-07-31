import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const paperRef = useRef(null);
  const flapRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => setShowText(true)
    });

    // 1. Rotate the top envelope flap up and open
    tl.to(flapRef.current, {
      rotateX: 180,
      duration: 0.6,
      ease: "power2.inOut"
    });

    // 2. Slide the paper out of the envelope
    tl.to(paperRef.current, {
      y: -140,
      zIndex: 40,
      duration: 0.8,
      ease: "power2.out"
    });

    // 3. Scale the paper to overlay center stage
    tl.to(paperRef.current, {
      scale: 1.1,
      y: -50,
      duration: 0.5,
      ease: "back.out(1.2)"
    });
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setShowText(false);
    setIsOpen(false);

    const tl = gsap.timeline();

    // 1. Scale down and push paper back down
    tl.to(paperRef.current, {
      scale: 1,
      y: -140,
      duration: 0.5,
      ease: "power2.in"
    });

    // 2. Slide the paper back inside the envelope envelope body
    tl.to(paperRef.current, {
      y: 0,
      zIndex: 10,
      duration: 0.8,
      ease: "power2.inOut"
    });

    // 3. Fold the envelope top flap shut
    tl.to(flapRef.current, {
      rotateX: 0,
      duration: 0.6,
      ease: "power2.inOut"
    });
  };

  return (
    <section className="min-h-screen w-full relative py-24 px-4 md:px-8 bg-[#040406] flex flex-col items-center justify-center">
      {/* Pink glow under envelope */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full radial-glow-pink opacity-10 -z-10" />

      {/* Header */}
      <div className="text-center mb-16 max-w-xl">
        <span className="text-romantic-pink font-sans font-semibold tracking-widest text-xs uppercase">
          Love Letter
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-pink text-white">
          A Letter For You
        </h2>
        <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
          Six years of shared moments, packed inside a small envelope. Click on the wax seal to open it and read.
        </p>
      </div>

      {/* 3D Envelope Wrapper */}
      <div className="relative w-80 h-56 md:w-96 md:h-64 flex justify-center items-end select-none">
        
        {/* The Paper Sheet (hidden inside, sliding up) */}
        <div
          ref={paperRef}
          style={{ zIndex: 10 }}
          className="absolute bottom-6 w-[90%] h-[120%] bg-[#fafaf8] rounded-lg shadow-md border border-zinc-200/50 p-6 md:p-8 flex flex-col text-left text-zinc-800 pointer-events-none transform-style-3d origin-bottom"
        >
          {isOpen && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-romantic-pink text-sm flex items-center justify-center p-1 border border-zinc-200 rounded-full cursor-none pointer-events-auto active:scale-95 transition-all clickable animate-pulse"
              title="Close Letter"
            >
              <FaTimes />
            </button>
          )}

          {/* Letter Body (Typewriter text reveal) */}
          <div className="flex flex-col gap-3 font-handwritten text-lg leading-relaxed select-text mt-4">
            {showText ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-bold text-zinc-950 text-xl">My Dearest,</p>
                <p className="mt-2 text-base md:text-lg">
                  Four Years. That's 1753 days of smiles, late night talks, and falling in love with you over and over again.
                </p>
                <p className="mt-2 text-base md:text-lg">
                  From school Classroom to Jalgaon auto rides, and Pune-Sambhajinagar distance, you have been my constant harbor.
                </p>
                <p className="mt-2 text-base md:text-lg">
                  Thank you for choosing me every single day. Happy Birthday, my love. Here's to forever. ❤️
                </p>
                <p className="mt-4 font-bold text-right text-zinc-900">- Yours Always</p>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-300 font-sans text-xs uppercase tracking-widest">
                Opening Letter...
              </div>
            )}
          </div>
        </div>

        {/* Envelope Body Front (z-index 30, overlapping paper) */}
        <div
          onClick={!isOpen ? handleOpen : undefined}
          style={{ zIndex: 30 }}
          className="w-full h-full bg-[#1c1d24] border border-white/5 shadow-2xl relative rounded-b-xl overflow-hidden cursor-none"
        >
          {/* Decorative lines making up the side flaps of the envelope envelope */}
          <svg className="absolute inset-0 w-full h-full fill-none stroke-white/5 pointer-events-none" strokeWidth="1.5">
            {/* Left flap triangle outline */}
            <path d="M 0,0 L 160,112 L 0,224" />
            {/* Right flap triangle outline */}
            <path d="M 320,0 L 160,112 L 320,224" />
            {/* Bottom flap triangle fill color overlay */}
            <path d="M 0,224 L 160,112 L 320,224" fill="rgba(28, 29, 36, 0.95)" stroke="rgba(255, 255, 255, 0.05)" />
          </svg>

          {/* Red Wax Seal button */}
          {!isOpen && (
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 cursor-none">
              <button
                className="w-12 h-12 rounded-full bg-romantic-pink border-2 border-white/20 shadow-lg shadow-romantic-pink/40 flex items-center justify-center text-white text-lg hover:scale-110 active:scale-95 transition-all duration-300 clickable"
                aria-label="Open Letter"
              >
                <FaHeart className="animate-pulse" />
              </button>
              <span className="text-[9px] text-white/40 tracking-widest uppercase font-sans font-bold">
                Tap to Open
              </span>
            </div>
          )}
        </div>

        {/* Envelope Top Flap (z-index 20, folding on top) */}
        <div
          ref={flapRef}
          style={{ 
            zIndex: 20,
            transformStyle: "preserve-3d",
            transformOrigin: "top center"
          }}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#252730] border-t border-white/10 rounded-t-xl pointer-events-none"
        >
          {/* Triangular flap background */}
          <svg className="absolute inset-0 w-full h-full fill-[#252730] stroke-white/10" viewBox="0 0 320 112" preserveAspectRatio="none">
            <polygon points="0,0 160,112 320,0" />
          </svg>
        </div>

      </div>
    </section>
  );
};

export default LoveLetter;
