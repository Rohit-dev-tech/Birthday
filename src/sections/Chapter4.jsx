import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPhoneAlt, FaInstagram, FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Chapter4 = () => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const messages = [
    {
      id: 1,
      type: "whatsapp",
      sender: "her",
      text: "I miss you... Pune feels so empty without you.",
      time: "22:15"
    },
    {
      id: 2,
      type: "whatsapp",
      sender: "me",
      text: "I miss you too, love. Just 12 more days until I see you.",
      time: "22:16"
    },
    {
      id: 3,
      type: "whatsapp",
      sender: "her",
      text: "Counting every second. Hug me tight when we meet, okay?",
      time: "22:18"
    },
    {
      id: 4,
      type: "instagram",
      text: "❤️ sume_loved_stories mentioned you in a post: 'Forever is a long time, but I wouldn't mind spending it with you.'",
      time: "Just now"
    },
    {
      id: 5,
      type: "call",
      text: "📞 Voice Call Ended • 02:43:18",
      time: "02:30 AM"
    }
  ];

  useEffect(() => {
    // Distance path drawing animation on scroll
    gsap.fromTo(".distance-path", 
      { strokeDashoffset: 500 },
      {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.5
        }
      }
    );

    // Floating notifications reveal on scroll
    const notifications = gsap.utils.toArray('.floating-notif');
    notifications.forEach((notif, index) => {
      gsap.fromTo(notif,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: notif,
            start: "top 85%",
            end: "top 60%",
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative py-24 px-4 md:px-8 bg-[#040406] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Dark purple glow representing late-night calling screens */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full radial-glow-purple opacity-10 -z-10" />

      {/* Chapter Details */}
      <div className="text-center mb-16 max-w-xl">
        <span className="text-romantic-purple font-sans font-semibold tracking-widest text-xs uppercase">
          Chapter 4 • Long Distance
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-purple text-white">
          Distance Tested Us
        </h2>
        <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
          Pune and Sambhajinagar separated us by kilometers. But pixelated screens, infinite chat bubbles, and 3-hour phone calls kept our hearts side-by-side.
        </p>
      </div>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-12 select-none">
        
        {/* Distance Line Map (Pune to Sambhajinagar) */}
        <div 
          ref={mapRef}
          className="w-full lg:w-1/2 glass-card p-8 rounded-3xl border border-white/5 flex flex-col justify-center items-center relative min-h-[350px]"
        >
          <div className="absolute top-4 left-6 text-xs text-white/30 tracking-widest uppercase">Distance Map</div>

          {/* SVG Map Path */}
          <svg className="w-full h-48 drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]" viewBox="0 0 400 200">
            {/* Pune Node */}
            <circle cx="80" cy="140" r="6" fill="#c084fc" className="animate-ping" />
            <circle cx="80" cy="140" r="5" fill="#c084fc" />
            <text x="60" y="170" fill="rgba(255,255,255,0.7)" className="text-xs font-sans font-semibold tracking-widest">PUNE</text>

            {/* Sambhajinagar Node */}
            <circle cx="320" cy="60" r="6" fill="#ff8fa3" className="animate-ping" />
            <circle cx="320" cy="60" r="5" fill="#ff8fa3" />
            <text x="270" y="40" fill="rgba(255,255,255,0.7)" className="text-xs font-sans font-semibold tracking-widest">SAMBHAJINAGAR</text>

            {/* Connecting curve line */}
            <path 
              d="M 80,140 Q 200,60 320,60" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.1)" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
            />

            {/* Glowing active path drawn on scroll */}
            <path 
              d="M 80,140 Q 200,60 320,60" 
              fill="none" 
              stroke="url(#purplePinkGrad)" 
              strokeWidth="3" 
              className="distance-path"
              strokeDasharray="500"
              strokeDashoffset="500"
            />

            {/* Define Gradients */}
            <defs>
              <linearGradient id="purplePinkGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#ff8fa3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Traveling Heart along path */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center mt-6">
            <span className="text-2xl text-romantic-pink animate-[bounce_1.5s_infinite]">✈️</span>
            <span className="text-xs font-sans text-white/40 uppercase tracking-widest mt-2">233 Kilometers Apart</span>
          </div>
        </div>

        {/* Message Feeds (WhatsApp / Notifications) */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 text-left">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`floating-notif glass-card p-4 rounded-2xl border transition-all duration-300 ${
                msg.type === 'whatsapp' 
                  ? msg.sender === 'her' 
                    ? 'border-emerald-500/10 bg-emerald-500/5 max-w-[85%] self-start' 
                    : 'border-white/10 bg-white/5 max-w-[85%] self-end text-right'
                  : msg.type === 'instagram'
                    ? 'border-pink-500/10 bg-pink-500/5 w-full'
                    : 'border-purple-500/10 bg-purple-500/5 w-full'
              }`}
            >
              {/* Message Header Icons */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {msg.type === 'whatsapp' && <FaWhatsapp className="text-emerald-400" />}
                  {msg.type === 'instagram' && <FaInstagram className="text-pink-400" />}
                  {msg.type === 'call' && <FaPhoneAlt className="text-purple-400" />}
                  <span className="text-[10px] text-white/40 tracking-wider uppercase font-semibold">
                    {msg.type === 'whatsapp' ? (msg.sender === 'her' ? 'My Girl' : 'Me') : msg.type}
                  </span>
                </div>
                <span className="text-[10px] text-white/30">{msg.time}</span>
              </div>

              {/* Body */}
              <p className="text-sm text-white/85 font-sans leading-relaxed">
                {msg.text}
              </p>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-16 text-center z-10">
        <h3 className="text-xl md:text-3xl font-serif italic text-white/80 tracking-wide">
          "Distance tested us. Love never gave up."
        </h3>
      </div>
    </section>
  );
};

export default Chapter4;
