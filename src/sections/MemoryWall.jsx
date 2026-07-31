import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegHeart, FaTimes, FaSearchPlus } from 'react-icons/fa';

import firstWalkImg from '../assets/memories/first_walk.jpg';
import sillyFaceImg from '../assets/memories/silly_face.jpg';
import coffeeDateImg from '../assets/memories/coffee_date.jpeg';
import sweetSmileImg from '../assets/memories/sweet_smile.jpeg';
import monsoonRideImg from '../assets/memories/monsoon_ride.png';
import sunsetImg from '../assets/memories/sunset.jpeg';
import birthdayImg from '../assets/memories/birthday.jpeg';
import holdingHandsImg from '../assets/memories/holding_hands.jpg';
import quietMomentImg from '../assets/memories/quiet_moment.jpg';

const MemoryWall = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = [
    {
      id: 1,
      title: "Our First Walk",
      caption: "That cold evening when we talked about everything and nothing.",
      path: firstWalkImg,
      style: "col-span-1 row-span-1 lg:-rotate-6 hover:rotate-0"
    },
    {
      id: 2,
      title: "Silly Face Selfie",
      caption: "You always make the funniest faces, and I love you for it.",
      path: sillyFaceImg,
      style: "col-span-1 row-span-1 lg:rotate-3 hover:rotate-0 translate-y-4"
    },
    {
      id: 3,
      title: "Coffee Date",
      caption: "Sharing a warm cup of cappuccino on a rainy afternoon.",
      path: coffeeDateImg,
      style: "col-span-1 row-span-1 lg:-rotate-3 hover:rotate-0 lg:translate-x-2"
    },
    {
      id: 4,
      title: "Your Sweet Smile",
      caption: "The exact expression that makes my heart skip a beat.",
      path: sweetSmileImg,
      style: "col-span-1 row-span-1 lg:rotate-6 hover:rotate-0 -translate-y-4"
    },
    {
      id: 5,
      title: "Monsoon Ride",
      caption: "Getting completely drenched in Pune rain, laughing all the way.",
      path: monsoonRideImg,
      style: "col-span-1 row-span-1 lg:-rotate-2 hover:rotate-0 lg:-translate-y-2"
    },
    {
      id: 6,
      title: "Sunset Chasing",
      caption: "Chasing gold horizons, holding hands, feeling completely at peace.",
      path: sunsetImg,
      style: "col-span-1 row-span-1 lg:rotate-6 hover:rotate-0 translate-x-4"
    },
    {
      id: 7,
      title: "Birthday Celebration",
      caption: "Cutting cake at midnight, celebrating another year of your life.",
      path: birthdayImg,
      style: "col-span-1 row-span-1 lg:-rotate-6 hover:rotate-0 translate-y-6"
    },
    {
      id: 8,
      title: "Holding Hands",
      caption: "No matter where we go, this is my favorite place to be.",
      path: holdingHandsImg,
      style: "col-span-1 row-span-1 lg:rotate-3 hover:rotate-0 -translate-x-4"
    },
    {
      id: 9,
      title: "The Quiet Moment",
      caption: "Just sitting in silence, realizing how lucky I am.",
      path: quietMomentImg,
      style: "col-span-1 row-span-1 lg:-rotate-4 hover:rotate-0 translate-y-2"
    }
  ];

  return (
    <section className="min-h-screen w-full relative py-24 px-4 md:px-8 bg-[#050505] flex flex-col items-center justify-center">
      {/* Pink ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full radial-glow-pink opacity-10 -z-10" />

      {/* Header */}
      <div className="text-center mb-16 max-w-xl">
        <span className="text-romantic-pink font-sans font-semibold tracking-widest text-xs uppercase">
          Memory Wall
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-pink text-white">
          Our Scattered Memories
        </h2>
        <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
          A physical collage of our six-year journey. Click on any picture to pull it closer and read the message behind it.
        </p>
      </div>

      {/* Grid Wall of Photos */}
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative px-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className={`glass-card p-4 rounded-xl border border-white/5 shadow-xl hover:border-romantic-pink/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,143,163,0.15)] transition-all duration-300 cursor-none relative group ${photo.style}`}
          >
            {/* Image Box */}
            <div className="w-full aspect-[4/3] rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group select-none">
              <img src={photo.path} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
              {/* Zoom hover indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaSearchPlus className="text-white text-3xl animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <div className="mt-4 text-left">
              <h3 className="text-sm font-semibold tracking-wide text-white/80 group-hover:text-white transition-colors">
                {photo.title}
              </h3>
              <p className="text-[11px] text-white/40 font-sans mt-1 line-clamp-1">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 cursor-none"
          >
            {/* Close Button */}
            <button 
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl clickable"
              aria-label="Close Lightbox"
            >
              <FaTimes />
            </button>

            {/* Main Lightbox Frame */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Stop closing on photo click
              className="bg-white rounded-2xl max-w-xl w-full p-4 md:p-6 shadow-2xl flex flex-col gap-4 border border-zinc-200 select-none text-left"
            >
              {/* Image box inside lightbox */}
              <div className="w-full aspect-[4/3] rounded-lg bg-zinc-100 border border-zinc-300 flex flex-col items-center justify-center relative overflow-hidden">
                <img src={activePhoto.path} alt={activePhoto.title} className="w-full h-full object-cover" />
              </div>

              {/* Text captions */}
              <div className="font-handwritten text-zinc-800">
                <h3 className="text-3xl font-bold">{activePhoto.title}</h3>
                <p className="text-xl text-zinc-600 mt-2 leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryWall;
