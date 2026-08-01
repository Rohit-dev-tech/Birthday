import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaStepForward } from 'react-icons/fa';

// TRACK LIST — add, remove, or reorder songs here.
// Put the actual mp3 files in the `public/` folder (not `src/assets/`),
// then reference them starting with a leading "/", e.g. "/song-one.mp3".
// "name" is just the label shown next to the player.
const tracks = [
  { name: "Our First Song", url: "/song1.mp3" },
  { name: "Our Second Song", url: "/song2.mp3" },
];

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);

  // Runs whenever play/pause is toggled OR the selected track changes —
  // reloading the <audio> element is required when its src changes while
  // mounted, otherwise some browsers keep playing the old file.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // Soft background level
    audio.load();

    if (isPlaying) {
      audio.play().catch((err) => {
        console.log("Audio autoplay prevented or failed:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, trackIndex, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setTrackIndex((prev) => (prev + 1) % tracks.length);
    // Keep playing straight through into the next track if music was
    // already on; if it was paused, switching tracks stays paused too.
    if (!isPlaying) setIsPlaying(true);
  };

  const currentTrack = tracks[trackIndex];

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      {/* Background Audio Tag */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop={tracks.length === 1}
        preload="auto"
        onEnded={() => {
          // With more than one track and loop off, auto-advance instead
          // of just stopping at silence.
          if (tracks.length > 1) nextTrack();
        }}
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

      {/* Skip to next track — only shown when there's more than one song */}
      {tracks.length > 1 && (
        <button
          onClick={nextTrack}
          className="glass-card w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/60 hover:text-romantic-pink hover:border-romantic-pink/40 hover:bg-white/5 active:scale-95 transition-all duration-300 shadow-lg clickable"
          title="Next song"
          aria-label="Skip to next song"
        >
          <FaStepForward className="text-xs" />
        </button>
      )}

      {/* Tiny indicator text */}
      {isPlaying && (
        <span className="hidden md:inline-block text-xs font-sans text-white/50 tracking-widest uppercase select-none pointer-events-none animate-pulse">
          {currentTrack.name}
        </span>
      )}
    </div>
  );
};

export default MusicPlayer;
