import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';

const CounterItem = ({ value, label }) => {
  return (
    <motion.div
      key={value}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="glass-card flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/5 shadow-2xl relative overflow-hidden group hover:border-romantic-gold/30 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)] transition-all duration-300"
    >
      {/* Golden glow light behind numbers */}
      <div className="absolute inset-0 bg-radial-gradient from-romantic-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Numerical counter digits */}
      <span className="text-2xl md:text-4xl font-serif font-bold text-romantic-gold glow-text-gold">
        {String(value).padStart(2, '0')}
      </span>

      {/* Label */}
      <span className="text-[9px] md:text-[10px] text-white/40 font-sans tracking-widest uppercase font-semibold mt-1">
        {label}
      </span>
    </motion.div>
  );
};

const LoveCounter = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Anniversary date: August 1, 2020 (when they first connected)
  const anniversaryDate = new Date('2020-08-01T00:00:00');

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let diff = now.getTime() - anniversaryDate.getTime();

      // Calculation of seconds, minutes, hours
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      // Calculation of calendar years, months, days
      let years = now.getFullYear() - anniversaryDate.getFullYear();
      let months = now.getMonth() - anniversaryDate.getMonth();
      let days = now.getDate() - anniversaryDate.getDate();

      // Adjust for negative days (days in previous month)
      if (days < 0) {
        months -= 1;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }

      // Adjust for negative months
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setTimeElapsed({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeCounters = [
    { label: 'Years', value: timeElapsed.years },
    { label: 'Months', value: timeElapsed.months },
    { label: 'Days', value: timeElapsed.days },
    { label: 'Hours', value: timeElapsed.hours },
    { label: 'Minutes', value: timeElapsed.minutes },
    { label: 'Seconds', value: timeElapsed.seconds }
  ];

  return (
    <section className="min-h-screen w-full relative py-24 px-4 md:px-8 bg-[#050505] flex flex-col items-center justify-center">
      {/* Ambient background gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full radial-glow-gold opacity-10 -z-10" />

      {/* Header */}
      <div className="text-center mb-16 max-w-xl">
        <span className="text-romantic-gold font-sans font-semibold tracking-widest text-xs uppercase">
          Love Counter
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-gold text-white">
          Time We Spent Together
        </h2>
        <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
          Six years of laughing, growing, overcoming distances, and falling deeper in love. Here is the exact count of our forever.
        </p>
      </div>

      {/* Counter Circles Grid */}
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl px-4 relative z-10">
        {timeCounters.map((counter) => (
          <CounterItem 
            key={counter.label}
            label={counter.label}
            value={counter.value}
          />
        ))}
      </div>

      {/* Pulse Heartbeat and Subtitle */}
      <div className="mt-16 text-center flex flex-col items-center gap-4 z-10 select-none">
        <div className="w-10 h-10 rounded-full bg-romantic-gold/10 flex items-center justify-center text-romantic-gold animate-[pulse_1.5s_infinite]">
          <FaHeartbeat className="text-lg" />
        </div>
        <p className="text-lg font-serif italic text-white/80 max-w-md mt-2">
          "Every single second with you is a second spent in heaven."
        </p>
      </div>
    </section>
  );
};

export default LoveCounter;
