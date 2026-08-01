import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeadphones, FaRegHeart } from 'react-icons/fa';

import firstDateImg from '../assets/first_date.jpeg';
import autoRideImg from '../assets/auto_ride.png';

gsap.registerPlugin(ScrollTrigger);

// FOCAL POINTS — controls which part of each photo stays visible when the
// frame crops it (object-fit: cover crops overflow evenly from the center
// by default, which is why faces near the top of a tall photo can get
// cut off). Format is "horizontal% vertical%".
//   vertical 0%   = show the very TOP of the photo, crop from the bottom
//   vertical 50%  = default center crop
//   vertical 100% = show the very BOTTOM of the photo, crop from the top
// Nudge these numbers and save — no other code needs to change.
const FIRST_DATE_FOCAL = 'center 15%';
const AUTO_RIDE_FOCAL = 'center 50%';

const Chapter3 = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  // References to individual slides
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);
  const slide4Ref = useRef(null);

  // Train parallax layer references
  const hillsRef = useRef(null);
  const treesRef = useRef(null);

  // Streetlights reference for Auto Ride
  const lightsRef = useRef(null);

  useEffect(() => {
    // 1. Scene Pinning and Layer Transitions Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Scroll height to transition 4 scenes
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    // Animate layers: Slide 1 fades out, Slide 2 fades in
    tl.to(slide1Ref.current, { opacity: 0, scale: 0.95, duration: 1 })
      .fromTo(slide2Ref.current, 
        { opacity: 0, scale: 1.05 }, 
        { opacity: 1, scale: 1, duration: 1 }, 
        "-=0.5"
      )
      // Slide 2 fades out, Slide 3 fades in
      .to(slide2Ref.current, { opacity: 0, scale: 0.95, duration: 1 })
      .fromTo(slide3Ref.current, 
        { opacity: 0, scale: 1.05 }, 
        { opacity: 1, scale: 1, duration: 1 }, 
        "-=0.5"
      )
      // Slide 3 fades out, Slide 4 fades in
      .to(slide3Ref.current, { opacity: 0, scale: 0.95, duration: 1 })
      .fromTo(slide4Ref.current, 
        { opacity: 0, scale: 1.05 }, 
        { opacity: 1, scale: 1, duration: 1 }, 
        "-=0.5"
      );

    // 2. Train Landscape Parallax scrolling driven by ScrollTrigger
    gsap.to(hillsRef.current, {
      x: -150,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 0.5
      }
    });

    gsap.to(treesRef.current, {
      x: -300,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 0.2
      }
    });

    // 3. Passing Streetlights Animation (Auto Ride - Scene 3)
    if (lightsRef.current) {
      const lights = lightsRef.current.children;
      gsap.fromTo(lights, 
        { x: "120vw", opacity: 0 },
        {
          x: "-20vw",
          opacity: [0, 0.8, 0.8, 0],
          stagger: 0.5,
          duration: 3,
          repeat: -1,
          ease: "none"
        }
      );
    }

  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#050505] overflow-visible">
      
      {/* Pinned Viewport Container */}
      <div 
        ref={pinRef} 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* ==========================================
            SCENE 1: TRAIN JOURNEY
            ========================================== */}
        <div 
          ref={slide1Ref}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-[#03060c] z-30"
        >
          {/* Subtle blue gradient overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-transparent to-transparent pointer-events-none" />

          {/* Heading */}
          <div className="text-center mb-8 max-w-xl">
            <span className="text-blue-400 font-sans font-semibold tracking-widest text-xs uppercase">
              Jalgaon • Scene 1
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mt-2 tracking-wide text-white drop-shadow">
              Train Journey
            </h2>
          </div>

          {/* Shaking Train Window Frame */}
          <div className="shake-train w-full max-w-2xl h-80 md:h-[400px] border-[16px] border-[#1e1f29] bg-[#080d1a] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-end">
            
            {/* Parallax Moving Landscape */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              {/* Sky Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1b263b] via-[#415a77] to-[#e0e1dd] opacity-40" />
              {/* Glowing Sunset Moon */}
              <div className="absolute right-24 top-12 w-14 h-14 rounded-full bg-orange-200/50 blur-sm" />
              
              {/* Distant Hills (Slow Moving) */}
              <svg 
                ref={hillsRef}
                className="absolute bottom-12 left-0 w-[200%] h-32 fill-[#1a2536] opacity-70"
                viewBox="0 0 1000 100" 
                preserveAspectRatio="none"
              >
                <path d="M0,80 Q150,20 300,70 T600,40 T900,90 T1200,50 L1000,100 L0,100 Z" />
              </svg>

              {/* Nearby Trees & Telephone Poles (Fast Moving) */}
              <svg 
                ref={treesRef}
                className="absolute bottom-0 left-0 w-[300%] h-24 fill-[#0f172a]"
                viewBox="0 0 1000 100"
                preserveAspectRatio="none"
              >
                {/* Simplified silhouette trees */}
                <path d="M0,100 L30,60 L40,65 L50,55 L60,65 L70,60 L100,100 M200,100 L240,40 L280,100 M450,100 L480,50 L510,100 M700,100 L730,55 L760,100 Z" />
                {/* Telephone poles */}
                <line x1="150" y1="100" x2="150" y2="20" stroke="#0f172a" strokeWidth="2" />
                <line x1="135" y1="30" x2="165" y2="30" stroke="#0f172a" strokeWidth="1.5" />
                <line x1="550" y1="100" x2="550" y2="20" stroke="#0f172a" strokeWidth="2" />
                <line x1="535" y1="30" x2="565" y2="30" stroke="#0f172a" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Inner Window Rim and Reflection */}
            <div className="absolute inset-0 border border-white/5 rounded-[12px] bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />

            {/* Earphone overlay & Audio waves */}
            <div className="relative z-10 p-6 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-romantic-pink animate-pulse">
                  <FaHeadphones className="text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-serif italic text-white/90">
                    "One Earphone. Thousands of Conversations."
                  </h3>
                  <p className="text-xs text-white/40 font-sans tracking-wide">
                    Sharing music while the world flew by outside...
                  </p>
                </div>
              </div>

              {/* Music Waves display */}
              <div className="flex items-end h-8">
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SCENE 2: FIRST DATE
            ========================================== */}
        <div 
          ref={slide2Ref}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-[#0d0705] opacity-0 z-20"
        >
          {/* Warm background lighting */}
          <div className="absolute inset-0 bg-radial-gradient from-amber-900/10 via-transparent to-transparent pointer-events-none" />

          <div className="text-center mb-8 max-w-xl">
            <span className="text-romantic-pink font-sans font-semibold tracking-widest text-xs uppercase">
              Jalgaon • Scene 2
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mt-2 tracking-wide text-white">
              First Date
            </h2>
          </div>

          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            {/* Ambient Candle simulation inside the card */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Photo Placeholder */}
            <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center items-center relative overflow-hidden select-none group hover:border-romantic-pink/30 transition-all duration-300">
              <img
                src={firstDateImg}
                alt="First Date"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: FIRST_DATE_FOCAL }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <p className="text-xs text-white/80 font-sans tracking-wide">
                  First Date ❤️
                </p>
              </div>
            </div>

            {/* Candle/Steam and text column */}
            <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-4">
              {/* Flickering Candle SVG */}
              <div className="flex items-center gap-3">
                <svg className="w-8 h-12" viewBox="0 0 24 36">
                  {/* Steam waves */}
                  <path className="animate-[pulse_1.5s_infinite]" d="M12,6 Q14,3 12,0" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1.5" fill="none" />
                  {/* Wax candle body */}
                  <rect x="9" y="16" width="6" height="20" rx="1.5" fill="#f59e0b" />
                  {/* Wick */}
                  <line x1="12" y1="16" x2="12" y2="12" stroke="#4b5563" strokeWidth="1.5" />
                  {/* Candle flame */}
                  <path 
                    className="animate-[bounce_0.8s_infinite]" 
                    d="M12,6 Q15,10 12,14 Q9,10 12,6 Z" 
                    fill="#ef4444" 
                    style={{ transformOrigin: 'center 12px' }}
                  />
                  <path 
                    className="animate-[pulse_0.5s_infinite]" 
                    d="M12,8 Q13.5,10 12,12 Q10.5,10 12,8 Z" 
                    fill="#fbbf24" 
                    style={{ transformOrigin: 'center 10px' }}
                  />
                </svg>
                <span className="text-xs text-amber-500/80 font-sans tracking-wider uppercase">First lunch with You</span>
              </div>

              <h3 className="text-2xl font-serif text-white/95 leading-relaxed italic">
                "I was literally shivering while eating with you."
              </h3>
              
              <p className="text-sm text-white/50 leading-relaxed font-sans mt-2">
                My hands were shaking, my throat was dry. I couldn't focus on the food, because my entire universe was sitting right across from me.
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================
            SCENE 3: AUTO RIDE
            ========================================== */}
        <div 
          ref={slide3Ref}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-[#040406] opacity-0 z-10"
        >
          {/* Rain Overlay */}
          <div className="rain-overlay" />

          {/* Falling Streetlights Container (Parallax circles) */}
          <div ref={lightsRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[20%] w-32 h-32 rounded-full bg-yellow-500/10 blur-[80px]" />
            <div className="absolute top-[40%] w-48 h-48 rounded-full bg-yellow-500/8 blur-[100px]" />
            <div className="absolute top-[60%] w-40 h-40 rounded-full bg-yellow-500/12 blur-[90px]" />
          </div>

          <div className="text-center mb-8 max-w-xl relative z-10">
            <span className="text-indigo-400 font-sans font-semibold tracking-widest text-xs uppercase">
              Jalgaon • Scene 3
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mt-2 tracking-wide text-white">
              Auto Ride
            </h2>
          </div>

          <div className="glass-card max-w-2xl w-full p-8 rounded-3xl border border-white/5 flex flex-col-reverse md:flex-row items-center gap-8 relative z-10">
            
            <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-4">
              <span className="text-xs text-indigo-400 font-sans tracking-wider uppercase">Late Night City Streets</span>
              <h3 className="text-2xl font-serif text-white/95 leading-relaxed italic">
                "You rested your head on my shoulder... I was too dumb to understand how beautiful that moment was."
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-sans mt-2">
                The cool night breeze, the sound of rain tapping the canvas cover, and the warmth of you leaning against me. It felt like time had stopped, but I was too shy to say a word.
              </p>
            </div>

            {/* Photo Placeholder */}
            <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center items-center relative overflow-hidden select-none group hover:border-indigo-400/30 transition-all duration-300">
              <img
                src={autoRideImg}
                alt="Auto Ride"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: AUTO_RIDE_FOCAL }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <p className="text-xs text-white/80 font-sans tracking-wide">
                  Auto Ride ❤️
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            SCENE 4: BRIDGE WALK
            ========================================== */}
        <div 
          ref={slide4Ref}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-[#020204] opacity-0 z-0"
        >
          {/* Moon Glow Overlay */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-white/10 blur-[80px] pointer-events-none" />

          {/* Minimal Moon */}
          <div className="absolute top-16 right-20 w-24 h-24 rounded-full bg-zinc-200/90 shadow-[0_0_40px_rgba(255,255,255,0.3)] border border-white/10 flex justify-center items-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-zinc-800/10 absolute right-1 top-1" />
          </div>

          <div className="text-center mb-8 max-w-xl z-10">
            <span className="text-pink-300 font-sans font-semibold tracking-widest text-xs uppercase">
              Jalgaon • Scene 4
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mt-2 tracking-wide text-white">
              Bridge Walk
            </h2>
          </div>

          <div className="max-w-2xl text-center flex flex-col items-center gap-8 z-10 px-4">
            
            <h3 className="text-2xl md:text-4xl font-serif text-pink-100 italic leading-relaxed glow-text-pink">
              "We both wanted a hug. <br/>Neither of us said a word."
            </h3>

            <p className="text-white/60 leading-relaxed font-sans text-sm md:text-base max-w-lg">
              We walked along the bridge overlooking the quiet lake, listening to the soft murmur of the water. The air was cold, our hearts were pounding. A perfect silence that said everything our lips couldn't.
            </p>

            {/* Glowing heartbeat illustration */}
            <div className="flex items-center gap-4 mt-4">
              <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-pink-500/50" />
              <div className="relative flex items-center justify-center">
                <FaRegHeart className="text-pink-500 text-3xl animate-[ping_2s_infinite]" />
                <FaRegHeart className="text-pink-500 text-3xl absolute" />
              </div>
              <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-pink-500/50" />
            </div>

            {/* Minimalist Water Reflection waves */}
            <div className="w-80 h-10 mt-8 flex flex-col justify-center gap-[6px] overflow-hidden opacity-30 select-none">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-[pulse_2s_infinite]" />
              <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent self-center animate-[pulse_1.5s_infinite]" />
              <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent self-center animate-[pulse_3s_infinite]" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Chapter3;
