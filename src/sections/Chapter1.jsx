import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPaperPlane } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Chapter1 = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const paperRef = useRef(null);
  const airplaneRef = useRef(null);

  // States to keep track of hovered card to trigger custom micro-heart bursts
  const [hoveredCard, setHoveredCard] = useState(null);

  const timelineEvents = [
    {
      id: 1,
      title: "Birthday Wish",
      date: "October 2021",
      description: "It all started with a simple 'Happy Birthday' message from You  on my speacial day. A tiny spark that set our world in motion."
    },
    {
      id: 2,
      title: "Instagram Reels Sharing ",
      date: "From October  2021 ",
      description: "Sharing memes, reels and all from that day , btw Initiative mi ghetla hota sang bara first reel konti hoti apli 😏."
    },
    {
      id: 3,
      title: "Daily Conversations",
      date: "From December 2020",
      description: "Conversations shifted from morning wishes to late-night Chatting. The days felt incomplete without you my Dear 💓"
    },
    {
      id: 4,
      title: "Sharing Everything",
      date: "there is no specific date",
      description: "Opening up about our secrets, dreams, and fears. We slowly became each other's safest harbor."
    },
    {
      id: 5,
      title: "Friends started Teasing Us",
      date: "Full 11th",
      description: "Classmates noticed the smiles. Friends kept laughing and pairing us up. our tshirt Color matching Speacially that Red one and Brown one & Do you remeber that Brown Munde "
    },
    {
      id: 6,
      title: "Falling in Love but no one confess",
      date: "April 2023",
      description: "Maybe We both know we Love each other but we are afraid of losing our friendship dear"
    }
  ];
  useEffect(() => {
    // GSAP ScrollTrigger to fade in the whole notebook paper panel
    gsap.fromTo(paperRef.current, 
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1
        }
      }
    );

    // Scroll reveal for the timeline cards inside the notebook
    const cards = gsap.utils.toArray('.notebook-timeline-card');
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            scrub: 1
          }
        }
      );
    });

    // Animate paper airplane drifting across notebook
    gsap.fromTo(airplaneRef.current,
      { x: -100, y: 200, rotate: 15, opacity: 0 },
      {
        x: 800,
        y: -100,
        rotate: -10,
        opacity: [0, 1, 1, 0],
        duration: 4,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: paperRef.current,
          start: "top 50%",
          end: "bottom 30%",
          scrub: 1.5
        }
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative py-24 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Pink glow lighting in background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full radial-glow-pink opacity-20 -z-10" />

      {/* Chapter header */}
      <div ref={titleRef} className="text-center mb-16 max-w-2xl px-4">
        <span className="text-romantic-pink font-sans font-semibold tracking-widest text-xs uppercase">
          Chapter 1 • 11th Standard
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-pink text-white">
          It All Started With A Birthday Wish
        </h2>
        <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
          The innocent beginnings. Simple chats, laughter, and high school corridors. Scroll down to revisit the notes we wrote in our minds.
        </p>
      </div>

      {/* Lined Notebook Paper Card */}
      <div 
        ref={paperRef}
        className="w-full max-w-4xl notebook-paper relative overflow-hidden"
      >
        {/* Paper spiral design holes on the left */}
        <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-around py-4 w-4 pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-[#050505] border border-gray-400/20 shadow-inner" />
          ))}
        </div>

        {/* Floating Paper Airplane */}
        <div ref={airplaneRef} className="absolute pointer-events-none z-20 text-romantic-pink/70">
          <FaPaperPlane className="text-3xl drop-shadow-md" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l-2 border-dashed border-gray-300/60 ml-2 md:ml-12 pl-6 md:pl-10 py-6 flex flex-col gap-12">
          {timelineEvents.map((event) => {
            const isHovered = hoveredCard === event.id;
            return (
              <div 
                key={event.id}
                className="notebook-timeline-card relative group transition-all duration-300"
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Lined paper timeline node bullet */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-romantic-pink flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-125 group-hover:bg-romantic-pink">
                  <FaHeart className="text-[8px] text-white group-hover:text-white" />
                </div>

                {/* Content note style */}
                <div className="bg-[#fcfcfa]/80 rounded-xl p-6 border border-gray-200/40 hover:border-romantic-pink/30 hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative select-none">
                  {/* Micro interaction: Hearts floating up on hover */}
                  {isHovered && (
                    <div className="absolute right-4 top-4 flex gap-1 pointer-events-none">
                      <motion.span
                        initial={{ opacity: 1, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -20, scale: 1.2 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-romantic-pink text-sm"
                      >
                        ❤️
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 1, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -15, scale: 1 }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="text-romantic-pink/80 text-xs"
                      >
                        ❤️
                      </motion.span>
                    </div>
                  )}

                  <span className="text-romantic-pink font-handwritten font-bold text-lg">
                    {event.date}
                  </span>
                  
                  <h3 className="text-xl font-serif text-gray-800 font-bold tracking-wide mt-1 group-hover:text-black transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 font-handwritten text-lg leading-relaxed mt-2">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Chapter1;
