import React, { useState, useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Components
import CustomCursor from './components/CustomCursor';
import MusicPlayer from './components/MusicPlayer';
import ThreeBackground from './components/ThreeBackground';

// Import Sections
import IntroScreen from './sections/IntroScreen';
import Chapter1 from './sections/Chapter1';
import Chapter2 from './sections/Chapter2';
import Chapter3 from './sections/Chapter3';
import Chapter4 from './sections/Chapter4';
import Chapter5 from './sections/Chapter5';
import MemoryWall from './sections/MemoryWall';
import LoveCounter from './sections/LoveCounter';
import ReasonsSection from './sections/ReasonsSection';
import LoveLetter from './sections/LoveLetter';
import FinalSurprise from './sections/FinalSurprise';
import Ending from './sections/Ending';

gsap.registerPlugin(ScrollTrigger);

function ScrollSync() {
  const lenis = useLenis();
  
  useEffect(() => {
    if (!lenis) return;

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    const syncScroll = () => {
      ScrollTrigger.update();
    };
    
    lenis.on('scroll', syncScroll);

    // Sync GSAP animations with Lenis frame loop for pixel-perfect sync
    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', syncScroll);
      gsap.ticker.remove(rafCallback);
    };
  }, [lenis]);

  return null;
}

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showEnding, setShowEnding] = useState(false);

  // Trigger ScrollTrigger refresh whenever sections mount/unmount
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [hasStarted, showEnding]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothTouch: true, autoRaf: false }}>
      <ScrollSync />
      
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* R3F 3D Background */}
      <ThreeBackground />

      {/* Floating Audio Controller */}
      <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />

      {/* Main Flow Orchestrator */}
      {!hasStarted ? (
        <IntroScreen 
          onStart={() => setHasStarted(true)} 
          isMusicPlaying={isMusicPlaying}
          setIsMusicPlaying={setIsMusicPlaying}
        />
      ) : (
        <div className="w-full flex flex-col relative z-20">
          <Chapter1 />
          <Chapter2 />
          <Chapter3 />
          <Chapter4 />
          <Chapter5 />
          <MemoryWall />
          <LoveCounter />
          <ReasonsSection />
          <LoveLetter />
          <FinalSurprise onComplete={() => setShowEnding(true)} />
          {showEnding && <Ending />}
        </div>
      )}
    </ReactLenis>
  );
}

export default App;
