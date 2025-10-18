"use client";

import React, { useState, useEffect, useRef } from "react";
import { Nosifer } from "next/font/google";

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
});

// Configuration Constants
const DARKNESS_MS = 800; // Initial darkness after button click
const BAT_SWARM_DURATION_MS = 4000; // Duration of bat animation
const FADE_OUT_DURATION_MS = 1000; // Fade to hero
const AUDIO_GAP_MS = 3000; // 3 second gap between audio loops

interface Bat {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  scale: number;
  speed: number;
  wobbleX: number;
  wobbleY: number;
  rotationSpeed: number;
}

interface WelcomeScreenProps {
  onComplete?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<"initial" | "darkness" | "bat-swarm" | "fadeout">("initial");
  const [opacity, setOpacity] = useState("opacity-100");
  const [isMuted, setIsMuted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bats, setBats] = useState<Bat[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioLoopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isCompletingRef = useRef(false);

  // Initialize bats only on client side
  useEffect(() => {
    setIsClient(true);
    
    const isMobileView = window.innerWidth < 768;
    const numberOfBats = isMobileView ? 60 : 80;
    
    const generatedBats: Bat[] = Array.from({ length: numberOfBats }).map((_, i) => {
      const wave = Math.floor(i / 15);
      const inWave = i % 15;
      
      // Create more random distribution across the entire screen
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 100; // Increased distance for wider spread
      
      return {
        id: i,
        startX: 50 + (Math.random() - 0.5) * 15, // Slightly wider start area
        startY: 50 + (Math.random() - 0.5) * 15,
        endX: 50 + Math.cos(angle) * distance + (Math.random() - 0.5) * 50,
        endY: 50 + Math.sin(angle) * distance + (Math.random() - 0.5) * 50,
        delay: wave * 250 + inWave * 40 + Math.random() * 150,
        scale: isMobileView ? 0.5 + Math.random() * 0.9 : 0.35 + Math.random() * 0.8,
        speed: isMobileView ? 2200 + Math.random() * 1200 : 1800 + Math.random() * 1200,
        wobbleX: (Math.random() - 0.5) * (isMobileView ? 25 : 40),
        wobbleY: (Math.random() - 0.5) * (isMobileView ? 25 : 40),
        rotationSpeed: 350 + Math.random() * 450,
      };
    });
    
    setBats(generatedBats);
  }, []);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (audioLoopTimerRef.current) {
        clearTimeout(audioLoopTimerRef.current);
      }
    };
  }, []);

  // Handle the enter button click
  const handleEnter = () => {
    // Lightning flash effect
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 150);

    // Play spooky background music with 3 second gaps
    const playAudioWithGap = () => {
      if (audioRef.current && !isCompletingRef.current) {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setAudioEnabled(true);
            })
            .catch((err) => {
              console.log("Audio play error:", err.message);
            });
        }
      }
    };

    const setupAudioLoop = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.muted = false;
        
        const handleAudioEnd = () => {
          if (!isCompletingRef.current) {
            audioLoopTimerRef.current = setTimeout(() => {
              playAudioWithGap();
            }, AUDIO_GAP_MS);
          }
        };
        
        audioRef.current.addEventListener('ended', handleAudioEnd);
        playAudioWithGap();
      }
    };

    setupAudioLoop();

    // Start the animation sequence
    setStage("darkness");
    
    setTimeout(() => {
      setStage("bat-swarm");
      
      // Auto-transition to fadeout after bat animation
      setTimeout(() => {
        handleComplete();
      }, BAT_SWARM_DURATION_MS);
    }, DARKNESS_MS);
  };

  const handleComplete = () => {
    isCompletingRef.current = true;
    
    if (audioLoopTimerRef.current) {
      clearTimeout(audioLoopTimerRef.current);
    }
    
    setStage("fadeout");
    setOpacity("opacity-0");
    
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (onComplete) onComplete();
    }, FADE_OUT_DURATION_MS);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (!audioEnabled) {
        audioRef.current.play()
          .then(() => {
            setAudioEnabled(true);
            audioRef.current!.muted = false;
            setIsMuted(false);
          })
          .catch(err => console.log("Could not play audio:", err));
      } else {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const styles = `
    @keyframes cave-emerge {
      0% { 
        transform: translate(var(--start-x), var(--start-y)) scale(0.1) rotate(0deg);
        opacity: 0;
      }
      8% {
        opacity: 1;
        transform: translate(var(--start-x), var(--start-y)) scale(var(--scale)) rotate(60deg);
      }
      50% {
        transform: translate(
          calc(var(--start-x) + var(--wobble-x)), 
          calc(var(--start-y) + var(--wobble-y))
        ) scale(calc(var(--scale) * 1.3)) rotate(240deg);
      }
      100% { 
        transform: translate(var(--end-x), var(--end-y)) scale(calc(var(--scale) * 0.2)) rotate(720deg);
        opacity: 0;
      }
    }

    @keyframes wing-beat {
      0%, 100% { transform: scaleX(1) scaleY(1); }
      25% { transform: scaleX(1.5) scaleY(0.6); }
      50% { transform: scaleX(0.7) scaleY(1.4); }
      75% { transform: scaleX(1.3) scaleY(0.7); }
    }

    @keyframes button-pulse {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 
          0 0 20px rgba(255, 7, 0, 0.4),
          0 0 40px rgba(255, 7, 0, 0.2),
          inset 0 0 20px rgba(255, 7, 0, 0.1);
      }
      50% { 
        transform: scale(1.05);
        box-shadow: 
          0 0 30px rgba(255, 7, 0, 0.6),
          0 0 60px rgba(255, 7, 0, 0.3),
          inset 0 0 30px rgba(255, 7, 0, 0.15);
      }
    }

    @keyframes button-glow {
      0%, 100% { 
        text-shadow: 
          0 0 10px rgba(255, 7, 0, 0.8),
          0 0 20px rgba(255, 7, 0, 0.4),
          0 0 30px rgba(255, 7, 0, 0.2);
      }
      50% { 
        text-shadow: 
          0 0 15px rgba(255, 7, 0, 1),
          0 0 30px rgba(255, 7, 0, 0.6),
          0 0 45px rgba(255, 7, 0, 0.3);
      }
    }

    @keyframes cave-ambience {
      0%, 100% { 
        background: radial-gradient(ellipse 40% 40% at 50% 50%, rgba(20, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 60%, #000000 100%);
      }
      50% { 
        background: radial-gradient(ellipse 45% 45% at 50% 50%, rgba(30, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.95) 60%, #000000 100%);
      }
    }

    @keyframes flicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.85; }
    }

    @keyframes spooky-float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes creepy-shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-2px) rotate(-0.5deg); }
      75% { transform: translateX(2px) rotate(0.5deg); }
    }

    @keyframes favicon-pulse {
      0%, 100% { 
        transform: scale(1);
      }
      50% { 
        transform: scale(1.15);
      }
    }

    @keyframes favicon-glow {
      0%, 100% { 
        filter: drop-shadow(0 0 10px rgba(255, 7, 0, 0.6)) drop-shadow(0 0 20px rgba(255, 7, 0, 0.3));
      }
      50% { 
        filter: drop-shadow(0 0 20px rgba(255, 7, 0, 0.9)) drop-shadow(0 0 40px rgba(255, 7, 0, 0.5));
      }
    }

    @keyframes star-twinkle {
      0%, 100% { 
        opacity: 0.3;
        transform: scale(0.8);
      }
      50% { 
        opacity: 1;
        transform: scale(1.2);
      }
    }

    @keyframes star-pulse {
      0%, 100% { 
        opacity: 0.5;
        transform: scale(1);
      }
      50% { 
        opacity: 0.9;
        transform: scale(1.3);
      }
    }
  `;

  // Don't render until client-side
  if (!isClient) {
    return (
      <div
        className={`fixed inset-0 w-screen h-screen z-[9999] overflow-hidden bg-black ${opacity}`}
        style={{
          transitionDuration: stage === "fadeout" ? `${FADE_OUT_DURATION_MS}ms` : "0ms",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[9999] overflow-hidden
                  bg-black transition-opacity ${opacity}`}
      style={{
        transitionDuration:
          stage === "fadeout" ? `${FADE_OUT_DURATION_MS}ms` : "0ms",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      <style>{styles}</style>

      {/* Background Music */}
      <audio ref={audioRef} preload="auto">
        <source src="/audio/spooky-intro.mp3" type="audio/mpeg" />
      </audio>

      {/* Lightning Flash Effect */}
      {showFlash && (
        <div className="absolute inset-0 bg-white pointer-events-none z-50" 
             style={{ animation: "flicker 150ms ease-out" }} />
      )}

      {/* Dark cave atmosphere with subtle red glow from depths */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          animation:
            stage === "bat-swarm"
              ? "cave-ambience 4s ease-in-out infinite"
              : "none",
          background:
            stage === "initial" 
              ? "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(40, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.85) 50%, #000000 100%)"
              : "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(20, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 60%, #000000 100%)",
        }}
      />

      {/* Deep cave vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Subtle red glow from cave depths */}
      {(stage === "bat-swarm" || stage === "initial") && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 0, 0, 0.6) 0%, transparent 70%)",
              filter: "blur(80px)",
              animation: "flicker 3s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Enhanced visibility overlay for mobile */}
      {isMobile && (stage === "bat-swarm" || stage === "initial") && (
        <div className="absolute inset-0 pointer-events-none" 
             style={{
               background: "radial-gradient(circle at center, transparent 0%, rgba(40, 0, 0, 0.3) 70%)",
             }}
        />
      )}

      {/* CENTER FAVICON - Shows during bat swarm */}
      {(stage === "bat-swarm" || stage === "darkness") && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          <div 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
            style={{
              animation: "favicon-pulse 3s ease-in-out infinite, favicon-glow 2s ease-in-out infinite",
            }}
          >
            <img 
              src="/favicon.ico" 
              alt="Favicon"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* BAT SWARM - Flying all around the screen */}
      {(stage === "bat-swarm" || stage === "darkness") &&
        bats.map((bat) => (
          <div
            key={bat.id}
            className="absolute pointer-events-none"
            style={{
              "--start-x": `${bat.startX - 50}vw`,
              "--start-y": `${bat.startY - 50}vh`,
              "--end-x": `${bat.endX - 50}vw`,
              "--end-y": `${bat.endY - 50}vh`,
              "--scale": bat.scale,
              "--wobble-x": `${bat.wobbleX}vw`,
              "--wobble-y": `${bat.wobbleY}vh`,
              animation: `cave-emerge ${bat.speed}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${bat.delay}ms infinite`,
              left: "50%",
              top: "50%",
              filter: isMobile 
                ? "drop-shadow(0 0 4px rgba(139, 0, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 0, 0, 0.4))"
                : "drop-shadow(0 0 3px rgba(100, 0, 0, 0.5))",
            } as React.CSSProperties}
          >
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
              viewBox="0 0 100 60"
              style={{
                animation: `wing-beat ${bat.rotationSpeed}ms ease-in-out infinite`,
              }}
            >
              <ellipse cx="50" cy="30" rx="8" ry="12" fill={isMobile ? "#1a1a1a" : "#0a0a0a"} />

              <path
                d="M42 28 Q20 10 7 17 Q2 24 5 35 Q15 39 29 36 Q39 32 42 29 Z"
                fill={isMobile ? "#151515" : "#050505"}
                stroke={isMobile ? "#2a2a2a" : "#1a1a1a"}
                strokeWidth="0.5"
              />
              <path
                d="M42 28 Q24 14 11 19"
                stroke={isMobile ? "#202020" : "#0d0d0d"}
                strokeWidth="0.5"
                fill="none"
                opacity="0.6"
              />

              <path
                d="M58 28 Q80 10 93 17 Q98 24 95 35 Q85 39 71 36 Q61 32 58 29 Z"
                fill={isMobile ? "#151515" : "#050505"}
                stroke={isMobile ? "#2a2a2a" : "#1a1a1a"}
                strokeWidth="0.5"
              />
              <path
                d="M58 28 Q76 14 89 19"
                stroke={isMobile ? "#202020" : "#0d0d0d"}
                strokeWidth="0.5"
                fill="none"
                opacity="0.6"
              />

              <circle cx="45" cy="28" r="2" fill="#FF0000" opacity={isMobile ? "0.95" : "0.8"}>
                <animate
                  attributeName="opacity"
                  values={isMobile ? "0.9;1;0.9" : "0.8;1;0.8"}
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="55" cy="28" r="2" fill="#FF0000" opacity={isMobile ? "0.95" : "0.8"}>
                <animate
                  attributeName="opacity"
                  values={isMobile ? "0.9;1;0.9" : "0.8;1;0.8"}
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>

              <path d="M44 21 L41 14 L46 19 Z" fill={isMobile ? "#1a1a1a" : "#0a0a0a"} />
              <path d="M56 21 L59 14 L54 19 Z" fill={isMobile ? "#1a1a1a" : "#0a0a0a"} />
            </svg>
          </div>
        ))}

      {/* ENTER BUTTON - Shows immediately */}
      {stage === "initial" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
          {/* Glowing Stars Behind Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Red/White twinkling stars */}
            {[...Array(20)].map((_, i) => {
              const randomX = (Math.random() - 0.5) * 60; // -30 to 30
              const randomY = (Math.random() - 0.5) * 40; // -20 to 20
              const randomSize = 2 + Math.random() * 4; // 2-6px
              const randomDelay = Math.random() * 3; // 0-3s
              const isRed = Math.random() > 0.5;
              
              return (
                <div
                  key={`star-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `calc(50% + ${randomX}vw)`,
                    top: `calc(50% + ${randomY}vh)`,
                    width: `${randomSize}px`,
                    height: `${randomSize}px`,
                    background: isRed 
                      ? 'radial-gradient(circle, rgba(255, 7, 0, 1) 0%, rgba(255, 7, 0, 0.4) 50%, transparent 100%)'
                      : 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                    boxShadow: isRed
                      ? '0 0 10px rgba(255, 7, 0, 0.8), 0 0 20px rgba(255, 7, 0, 0.4)'
                      : '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)',
                    animation: i % 2 === 0 
                      ? `star-twinkle ${2 + Math.random() * 2}s ease-in-out ${randomDelay}s infinite`
                      : `star-pulse ${2.5 + Math.random() * 2}s ease-in-out ${randomDelay}s infinite`,
                  }}
                />
              );
            })}
          </div>

          {/* Creepy fog tendrils */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-900/20 to-transparent"
                 style={{ animation: "spooky-float 6s ease-in-out infinite" }} />
          </div>

          <button
            onClick={handleEnter}
            className={`${nosifer.className}
                       px-6 py-4 sm:px-8 sm:py-6 md:px-10 md:py-7 lg:px-12 lg:py-8
                       bg-black/80 hover:bg-black/90 active:bg-black
                       border-2 border-[#FF0700]/50 hover:border-[#FF0700]
                       rounded-lg
                       text-[#FF0700] hover:text-[#FF0700]
                       text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold
                       transition-all duration-300
                       touch-manipulation
                       relative overflow-hidden
                       group
                       z-10`}
            style={{
              animation: "button-pulse 2s ease-in-out infinite, creepy-shake 3s ease-in-out infinite",
              textShadow: "0 0 10px rgba(255, 7, 0, 0.8), 0 0 20px rgba(255, 7, 0, 0.4)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF0700]/10 to-transparent 
                          translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            {/* Dripping blood effect */}
            <div className="absolute top-0 left-1/4 w-1 h-3 bg-[#8B0000] rounded-full opacity-60"
                 style={{ animation: "spooky-float 2s ease-in-out infinite" }} />
            <div className="absolute top-0 right-1/3 w-1 h-4 bg-[#8B0000] rounded-full opacity-50"
                 style={{ animation: "spooky-float 2.5s ease-in-out infinite 0.5s" }} />
            
            <span style={{ animation: "button-glow 2s ease-in-out infinite" }}>
              Enter if you dare
            </span>
          </button>

          {/* Floating ghost-like wisps */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#FF0700]/20 rounded-full blur-sm"
               style={{ animation: "spooky-float 4s ease-in-out infinite" }} />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#FF0700]/15 rounded-full blur-sm"
               style={{ animation: "spooky-float 5s ease-in-out infinite 1s" }} />
        </div>
      )}

      {/* Sound toggle button */}
      {audioEnabled && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 
                     w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                     bg-black/70 hover:bg-black/90 active:bg-black/95
                     border border-[#FF0700]/30 hover:border-[#FF0700]/60
                     rounded-full
                     flex items-center justify-center
                     transition-all duration-300
                     group
                     touch-manipulation"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#FF0700]/60 group-hover:text-[#FF0700]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#FF0700]/60 group-hover:text-[#FF0700]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default WelcomeScreen;