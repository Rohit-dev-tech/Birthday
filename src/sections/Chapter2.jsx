import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DustCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dust particles definition
    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        density: Math.random() * 30 + 10,
        opacity: Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: Math.random() * 0.5 + 0.2
      });
    }

    // Draw frame loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Simulate diagonal sunlight beam from top-right
      const gradient = ctx.createLinearGradient(canvas.width, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(251, 191, 36, 0.05)');
      gradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render dust motes
      particles.forEach((p) => {
        ctx.beginPath();
        // Glow effect for dust particles
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.6)';
        ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset particles that drift off screen
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) {
          p.x = 0;
        } else if (p.x < 0) {
          p.x = canvas.width;
        }
      });

      // Clear shadow properties for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />;
};

const Chapter2 = () => {
  const containerRef = useRef(null);
  const boardRef = useRef(null);

  const memories = [
    {
      id: 1,
      text: "“Remember talking for hours... while pretending to listen to the chemistry lectures?”",
      doodle: "🧪 ❤️ ✏️"
    },
    {
      id: 2,
      text: "“Laughing silently at silly jokes until our stomachs hurt, hoping the teacher wouldn't notice.”",
      doodle: "🙊 😂 🏫"
    },
    {
      id: 3,
      text: "“Waiting for the bell to ring, just to walk down the corridors side-by-side, sharing a quick look.”",
      doodle: "🔔 👣 🍀"
    }
  ];

  useEffect(() => {
    // Fade and slide up the blackboard frame
    gsap.fromTo(boardRef.current,
      { opacity: 0, scale: 0.9, rotateX: -15 },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: 1
        }
      }
    );

    // Fade-in each chalk handwriting note sequentially on scroll
    const chalkTexts = gsap.utils.toArray('.chalk-text');
    chalkTexts.forEach((text) => {
      gsap.fromTo(text,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "top 55%",
            scrub: 1
          }
        }
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full relative py-24 px-4 md:px-8 flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Golden glow matching classroom sunlight */}
      <div className="absolute right-10 top-20 w-96 h-96 rounded-full radial-glow-gold opacity-15 -z-10" />

      {/* Chapter Details */}
      <div className="text-center mb-16 max-w-xl">
        <span className="text-romantic-gold font-sans font-semibold tracking-widest text-xs uppercase">
          Chapter 2 • 12th Standard
        </span>
        <h2 className="text-3xl md:text-5xl font-serif mt-3 tracking-wide glow-text-gold text-white">
          Our Last Bench
        </h2>
        <p className="text-white/60 font-sans text-sm mt-4 tracking-wide leading-relaxed">
          The classroom was boring, but the back bench was a world of our own. Scribbling on desks, passing notes, and stealing glances.
        </p>
      </div>

      {/* Blackboard container */}
      <div 
        ref={boardRef}
        className="w-full max-w-4xl blackboard rounded-lg min-h-[450px] p-8 md:p-12 relative flex flex-col justify-center items-center overflow-hidden [perspective:1000px]"
      >
        {/* Ambient Canvas for Floating Dust Particles */}
        <DustCanvas />

        {/* Blackboard chalk writing layout */}
        <div className="relative z-20 w-full flex flex-col gap-10 md:gap-14 text-center max-w-2xl">
          {memories.map((memory) => (
            <div key={memory.id} className="chalk-text flex flex-col items-center gap-2 group select-none">
              <p className="text-2xl md:text-3xl font-handwritten text-white/90 leading-snug tracking-wide transition-all duration-300 hover:text-white hover:scale-105">
                {memory.text}
              </p>
              <span className="text-sm opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                {memory.doodle}
              </span>
            </div>
          ))}

          {/* Faint chalk sketch board decorations */}
          <div className="absolute top-0 left-0 text-white/5 font-handwritten text-sm pointer-events-none select-none">
            Maths: 1+1 = ❤️
          </div>
          <div className="absolute bottom-0 right-0 text-white/5 font-handwritten text-sm pointer-events-none select-none">
            12-B • Forever
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chapter2;
