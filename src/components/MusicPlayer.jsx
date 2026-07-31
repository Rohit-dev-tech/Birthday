import React, { useEffect, useRef } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);

  // Audio track URL. User can replace this with a local file in public/ e.g. "/my-love-song.mp3"
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Soft background level
      
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Audio autoplay prevented or failed:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      {/* Background Audio Tag */}
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        preload="auto"
      />

      {/* Floating Controller Widget */}
      <button
        onClick={togglePlay}
        className="glass-card w-12 h-12 rounded-full flex items-center justify-center border border-white/10 text-white/80 hover:text-romantic-pink hover:border-romantic-pink/40 hover:bg-white/5 active:scale-95 transition-all duration-300 shadow-lg clickable"
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <div className="flex items-end justify-center gap-[2px] h-4 w-4">
            <span className="audio-bar" />
            <span className="audio-bar" />
            <span className="audio-bar" />
            <span className="audio-bar" />
            <span className="audio-bar" />
          </div>
        ) : (
          <FaVolumeMute className="text-lg" />
        )}
      </button>

      {/* Tiny indicator text */}
      {isPlaying && (
        <span className="hidden md:inline-block text-xs font-sans text-white/50 tracking-widest uppercase select-none pointer-events-none animate-pulse">
          Playing Ambient Theme
        </span>
      )}
    </div>
  );
};

export default MusicPlayer;
