import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeart } from 'react-icons/fa';

import firstHugImg from '../assets/first_hug.jpeg';
import firstKissImg from '../assets/first_kiss.jpg';
import feedingEachOtherImg from '../assets/feeding_each_other.jpeg';
import holdingHandsImg from '../assets/holding_hands.jpg';
import sleepingTogetherImg from '../assets/sleeping_together.png';
import creatingMemoriesImg from '../assets/creating_memories.jpg';

gsap.registerPlugin(ScrollTrigger);

const PolaroidCard = ({ title, caption, index, imgPath }) => {
  const cardRef = useRef(null);

  // Mouse hover 3D tilt effect logic
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within client rect
    const y = e.clientY - rect.top;  // y coordinate within client rect
    
    // Calculate rotation angles based on mouse offset from center
    const xAngle = (rect.height / 2 - y) / 10;
    const yAngle = (x - rect.width / 2) / 10;

    // Apply rotation
    card.style.transform = `scale(1.05) rotateX(${xAngle}deg) rotateY(${yAngle}deg) rotateZ(0deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Reset to default tilt depending on timeline index
    const baseTilt = index % 3 === 0 ? -4 : index % 3 === 1 ? 3 : 5;
    card.style.transform = `scale(1) rotateX(0deg) rotateY(0deg) rotateZ(${baseTilt}deg)`;
  };

  const baseTilt = index % 3 === 0 ? -4 : index % 3 === 1 ? 3 : 5;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `rotateZ(${baseTilt}deg)` }}
      className="polaroid w-72 md:w-80 cursor-none select-none transition-all duration-300 ease-out transform-style-3d [perspective:1000px] mb-8 inline-block"
    >
      {/* Polaroid Image Box */}
      <div className="w-full aspect-[4/3] bg-zinc-200 border border-zinc-300 rounded-sm overflow-hidden relative flex flex-col justify-center items-center group">
        <img src={imgPath} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
          <p className="text-xs text-white/90 font-sans tracking-wide">
            {title} ❤️
          </p>
        </div>
      </div>

      {/* Polaroid Caption */}
      <div className="pt-6 text-left font-handwritten">
        <h4 className="text-2xl text-zinc-800 font-bold leading-tight">{title}</h4>
        <p className="text-zinc-600 text-lg leading-relaxed mt-2">{caption}</p>
      </div>
    </div>
  );
};

const Chapter5 = () => {
  const containerRef = useRef(null);

  const reunionEvents = [
    {
      id: 1,
      title: "First Hug",
      caption: "The world fell silent. Standing at the arrivals gate, holding you felt like coming home after a lifetime.",
      imgPath: firstHugImg
    },
    {
      id: 2,
      title: "First Kiss",
      caption: "A spark of electric warmth beneath the evening streetlights. The moment time finally stood still for us.",
      imgPath: firstKissImg
    },
    {
      id: 3,
      title: "Feeding Each Other",
      caption: "Spilling noodles, laughing with our mouths full, and finding joy in the smallest, messiest moments.",
      imgPath: feedingEachOtherImg
    },
    {
      id: 4,
      title: "Holding Hands",
      caption: "Fingers interlaced, palm against palm. A silent promise that whatever comes, we walk through it together.",
      imgPath: holdingHandsImg
    },
    {
      id: 5,
      title: "Sleeping Together",
      caption: "Listening to the steady rhythm of your breathing, falling asleep safe in the knowledge that you are right here.",
      imgPath: sleepingTogetherImg
    },
    {
      id: 6,
      title: "Creating Memories",
      caption: "Every polaroid, every ticket stub, every inside joke. An endless gallery of love we built together.",
      imgPath: creatingMemoriesImg
    }
  ];

  useEffect(() => {
    // Polaroid cards scroll reveal trigger
    const polaroids = gsap.utils.toArray('.polaroid');
    polaroids.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.8, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 65%",
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative py-24 px-4 md:px-8 bg-[#050505] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Golden/Sunset radial background lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full radial-glow-gold opacity-15 -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full radial-glow-pink opacity-15 -z-10" />

      {/* Section Header */}
      <div className="text-center mb-20 max-w-xl">
        <span className="text-romantic-pink font-sans font-semibold tracking-widest text-xs uppercase">
          Chapter 5 • Reunion
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-pink text-white">
          The Reunion
        </h2>
        <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
          No distance could hold us back. The sweet warmth of meeting again, creating memories we can actually touch and hold.
        </p>
      </div>

      {/* Grid of scattered Polaroids */}
      <div className="w-full max-w-5xl flex flex-wrap justify-center gap-12 md:gap-16">
        {reunionEvents.map((event, index) => (
          <PolaroidCard 
            key={event.id}
            index={index}
            title={event.title}
            caption={event.caption}
            imgPath={event.imgPath}
          />
        ))}
      </div>
    </section>
  );
};

export default Chapter5;
