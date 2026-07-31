import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaSyncAlt } from 'react-icons/fa';

const FlipCard = ({ number, title, explanation }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-full aspect-[4/5] sm:aspect-square perspective-1000 cursor-none select-none"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full relative transform-style-3d duration-500"
      >
        {/* FRONT OF THE CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 shadow-xl hover:border-romantic-pink/30 hover:shadow-[0_0_20px_rgba(255,143,163,0.1)] transition-all">
          <div className="flex justify-between items-center w-full">
            <span className="text-[10px] text-white/30 tracking-widest font-sans font-bold uppercase">Reason #{number}</span>
            <FaHeart className="text-romantic-pink/40 text-xs" />
          </div>
          
          <div className="text-center my-auto flex flex-col items-center">
            <h3 className="text-xl font-serif text-white/90 leading-tight">
              {title}
            </h3>
          </div>

          <div className="flex justify-center items-center gap-1.5 text-[9px] text-white/30 tracking-widest uppercase font-sans">
            <FaSyncAlt className="text-[8px] animate-spin" style={{ animationDuration: '4s' }} />
            <span>Click to flip</span>
          </div>
        </div>

        {/* BACK OF THE CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-card rounded-2xl p-6 flex flex-col justify-between border border-romantic-pink/20 bg-white/5 shadow-2xl">
          <div className="flex justify-between items-center w-full">
            <span className="text-[10px] text-romantic-pink/40 tracking-widest font-sans font-bold uppercase">Reason #{number}</span>
            <FaHeart className="text-romantic-pink text-xs" />
          </div>

          <div className="text-left my-auto">
            <p className="text-sm text-white/80 leading-relaxed font-sans font-light">
              {explanation}
            </p>
          </div>

          <div className="text-center text-[9px] text-romantic-pink/30 tracking-widest uppercase font-sans">
            Deeply In Love
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ReasonsSection = () => {
  const reasons = [
    {
      id: 1,
      title: "Your Smile",
      explanation: "It has this magical ability to instantly light up my darkest days and make all my worries fade away."
    },
    {
      id: 2,
      title: "How You Care",
      explanation: "You check on my safety, ask if I ate, and take care of me in ways I never knew I needed."
    },
    {
      id: 3,
      title: "Your Voice",
      explanation: "Whether we are talking about life or sitting in silence, hearing your voice is my ultimate stress reliever."
    },
    {
      id: 4,
      title: "Your Laughter",
      explanation: "It is the most beautiful music to my ears. When you laugh, the entire world feels right."
    },
    {
      id: 5,
      title: "Your Support",
      explanation: "You believe in my dreams and stand by me, even when I am doubting my own capabilities."
    },
    {
      id: 6,
      title: "Your Kindness",
      explanation: "The gentle, loving way you treat others, showing your beautiful soul in every action."
    },
    {
      id: 7,
      title: "Your Patience",
      explanation: "How you deal with my stubbornness and moods, turning arguments into moments of understanding."
    },
    {
      id: 8,
      title: "Comfortable Silence",
      explanation: "We can sit together for hours without saying a word, feeling completely connected and happy."
    },
    {
      id: 9,
      title: "Your Hugs",
      explanation: "They feel like the safest place on earth. The moment you wrap your arms around me, I am home."
    },
    {
      id: 10,
      title: "Your Eyes",
      explanation: "They are so full of warmth and love. I still get butterflies whenever you catch me looking at you."
    },
    {
      id: 11,
      title: "Your Passion",
      explanation: "I love listening to you talk about your goals and interests, your eyes shining with excitement."
    },
    {
      id: 12,
      title: "How You Tease Me",
      explanation: "Your playful remarks, inside jokes, and cute quirks that make our daily talks so much fun."
    },
    {
      id: 13,
      title: "Your Inner Strength",
      explanation: "How bravely you face every challenge. You inspire me to be stronger and better every day."
    },
    {
      id: 14,
      title: "You Truly Listen",
      explanation: "You remember the smallest, random things I mention in passing, showing how much you value my words."
    },
    {
      id: 15,
      title: "Your Notebook Doodles",
      explanation: "The cute notes, handwritten words, and sweet doodles that show your creative, loving heart."
    },
    {
      id: 16,
      title: "Your Style",
      explanation: "You look stunning in everything you wear, but especially when you wear my oversized t-shirts."
    },
    {
      id: 17,
      title: "Hearing My Name",
      explanation: "The way my name sounds when you say it. It carries a special warmth only you can give."
    },
    {
      id: 18,
      title: "Your Unwavering Trust",
      explanation: "The secure foundation of loyalty we have built. I never have to doubt where we stand."
    },
    {
      id: 19,
      title: "You Choose Me Daily",
      explanation: "Through highs and lows, fights and laughter, you choose to stay, build, and grow with me."
    },
    {
      id: 20,
      title: "Your Heart",
      explanation: "Simply because it is the most beautiful, warm, and loving heart, and I am lucky enough to own it."
    }
  ];

  return (
    <section className="min-h-screen w-full relative py-24 px-4 md:px-8 bg-[#050505] flex flex-col items-center justify-center">
      {/* Pink glow */}
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full radial-glow-pink opacity-10 -z-10" />

      {/* Header */}
      <div className="text-center mb-16 max-w-xl">
        <span className="text-romantic-pink font-sans font-semibold tracking-widest text-xs uppercase">
          Special Notes
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-pink text-white">
          20 Reasons I Love You
        </h2>
        <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
          Little things, big moments, and everything in between. Click on each card to flip it and read the reason.
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="max-w-5xl w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
        {reasons.map((reason) => (
          <FlipCard
            key={reason.id}
            number={String(reason.id).padStart(2, '0')}
            title={reason.title}
            explanation={reason.explanation}
          />
        ))}
      </div>
    </section>
  );
};

export default ReasonsSection;
