"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Nosifer } from "next/font/google";

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
});

// Configuration Constants
const DARKNESS_MS = 300; // Initial darkness after button click
const BAT_SWARM_DURATION_MS = 1000; // Duration of bat animation
const FADE_OUT_DURATION_MS = 50; // Fade to hero
const _AUDIO_GAP_MS = 0; // 3 second gap between audio loops

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
  const [isMuted, setIsMuted] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bats, setBats] = useState<Bat[]>([]);
  const [baitAccepted, setBaitAccepted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [needsSoundGate, setNeedsSoundGate] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioLoopTimerRef = useRef<number | null>(null);
  const isCompletingRef = useRef(false);
  const unmuteButtonRef = useRef<HTMLButtonElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const ensureTimerRef = useRef<number | null>(null);

  // Bait overlay click: reveal welcome screen and treat as a user gesture for audio
  const handleBaitClick = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    setBaitAccepted(true);
    setNeedsSoundGate(false);
    // Next tick, attempt to enable audio using the user gesture context
    setTimeout(() => {
      void ensureAudioPlaying('interaction');
    }, 0);
  };

  // Try to ensure audio is actually playing and unmuted
  const ensureAudioPlaying = async (reason: string = "init") => {
    try {
      // Only allow audio during the initial stage before the sequence starts
      if (!baitAccepted || stage !== 'initial') return false;
      const el = audioRef.current;
      if (!el) return false;

      if (reason === 'interaction') {
        // Create/attach context only during gesture
        if (typeof window !== 'undefined') {
          const AC = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
            || (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          if (AC && !audioCtxRef.current) {
            try {
              audioCtxRef.current = new AC();
            } catch {}
          }
        }
        if (audioCtxRef.current && !audioSourceRef.current) {
          try {
            audioSourceRef.current = audioCtxRef.current.createMediaElementSource(el);
            audioSourceRef.current.connect(audioCtxRef.current.destination);
          } catch {}
        }
        el.muted = false;
        if (isMuted) setIsMuted(false);
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          try { await audioCtxRef.current.resume(); } catch {}
        }
      }

      el.volume = 0.4;
      const playPromise = el.play();
      if (playPromise && typeof (playPromise as Promise<void>).then === 'function') {
        await playPromise;
      }
      if (!audioEnabled) setAudioEnabled(true);
      setNeedsSoundGate(false);
      return true;
    } catch {
      return false;
    }
  };

  // Aggressively ensure audio starts (after bait accepted): immediate attempts + user-interaction fallbacks
  useEffect(() => {
    if (!baitAccepted) return;
    let stopped = false;

    const attempt = async (label: string) => {
      if (stopped) return;
      const ok = await ensureAudioPlaying(label);
      if (!ok) {
        // Schedule another small retry
        ensureTimerRef.current = window.setTimeout(() => attempt('retry'), 100);
      }
    };

    // Burst of quick attempts
    ensureTimerRef.current = window.setTimeout(() => attempt('t10'), 10);
    const t2 = window.setTimeout(() => attempt('t50'), 50);
    const t3 = window.setTimeout(() => attempt('t200'), 200);

    const onLoad = () => attempt('load');
    window.addEventListener('load', onLoad);

    // Add broad set of user-interaction events as last resort
    const events = ['pointerdown','pointerup','touchstart','touchend','keydown','keyup','wheel','click','mousemove','scroll','visibilitychange','focus','pageshow'] as const;
    const onInteract = (_ev?: Event) => {
      attempt('interaction');
      // Keep listeners in case first try fails again; they'll be removed on cleanup
    };
    events.forEach(evt => document.addEventListener(evt, onInteract as EventListener, { passive: true } as AddEventListenerOptions));

    // If after short delay we still aren't audible, show invisible gate to capture first gesture
    const gateTimer = window.setTimeout(() => {
      if (!audioEnabled || isMuted) setNeedsSoundGate(true);
    }, 500);

    return () => {
      stopped = true;
      if (ensureTimerRef.current) window.clearTimeout(ensureTimerRef.current);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(gateTimer);
      window.removeEventListener('load', onLoad);
  events.forEach(evt => document.removeEventListener(evt, onInteract as EventListener));
    };
  }, [baitAccepted]);

  // Detect whether browser requires gesture: inspect AudioContext.state and listen for statechange
  useEffect(() => {
    if (!baitAccepted) return;
    try {
      if (typeof window === 'undefined') return;
      const AC = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
        || (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AC();
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        const handleCtxState = () => {
          if (!ctx) return;
          if (ctx.state === 'running') {
            setNeedsSoundGate(false);
            ctx.removeEventListener('statechange', handleCtxState);
          } else if (ctx.state === 'suspended') {
            setNeedsSoundGate(true);
          }
        };
        // Initial assessment
        handleCtxState();
        // Listen for changes (e.g., when a gesture resumes the context)
        ctx.addEventListener('statechange', handleCtxState);
      }
    } catch {
      // Ignore detection errors
    }
  }, [baitAccepted]);

  const handleSoundGate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await ensureAudioPlaying('interaction');
    setNeedsSoundGate(false);
  };

  // Setup audio once bait is accepted
  useEffect(() => {
    if (!baitAccepted) return;
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      // Backup play attempt
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioEnabled(true);
          })
          .catch(() => {
            // Rely on interaction handlers/ensureAudioPlaying
          });
      }
    }
  }, [baitAccepted]);

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

    // Stop audio immediately when button is clicked
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // signal other audio components to stay silent during/after transition
    try { if (typeof window !== 'undefined') sessionStorage.setItem('suppressBackgroundAudio', '1'); } catch {}
    
    if (audioLoopTimerRef.current) {
      clearTimeout(audioLoopTimerRef.current);
    }

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
    
    // Stop audio immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.4; // Reset volume for next time
    }
    // ensure background audio won't auto-start after transition
    try { if (typeof window !== 'undefined') sessionStorage.setItem('suppressBackgroundAudio', '1'); } catch {}
    
    setStage("fadeout");
    setOpacity("opacity-0");
    
    setTimeout(() => {
      if (onComplete) onComplete();
    }, FADE_OUT_DURATION_MS);
  };

  // Extra safety: if stage moves away from initial, ensure audio is paused
  useEffect(() => {
    if (stage !== 'initial' && audioRef.current) {
      try {
        audioRef.current.pause();
      } catch {}
    }
  }, [stage]);

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

      {/* Background Music (spooky-music) - Auto-play (muted initially; unmute ensured via logic) */}
      <audio 
        ref={audioRef} 
        preload="auto" 
        autoPlay 
        loop
        muted={isMuted}
        playsInline
      >
        <source src="/audio/spooky-intro.mp3" type="audio/mpeg" />
      </audio>

      {/* Lightning Flash Effect */}
      {showFlash && (
        <div className="absolute inset-0 bg-white pointer-events-none z-50" 
             style={{ animation: "flicker 150ms ease-out" }} />
      )}

      {/* Invisible Sound Gate: only after bait is accepted; captures first gesture to satisfy autoplay policies */}
      {baitAccepted && needsSoundGate && (
        <button
          onClick={handleSoundGate}
          onPointerDown={handleSoundGate}
          onTouchStart={handleSoundGate}
          onKeyDown={handleSoundGate}
          aria-label="Enable sound"
          className="absolute inset-0 z-[60]"
          style={{
            // full screen invisible overlay
            background: 'transparent',
            cursor: 'auto',
            // prevent blocking non-gesture elements underneath except to capture the first gesture
          }}
        />
      )}

      {/* Bait Overlay: fully transparent full-screen button capturing first gesture */}
      {!baitAccepted && (
        <button
          onClick={handleBaitClick}
          onPointerDown={handleBaitClick}
          onTouchStart={handleBaitClick}
          aria-label="Enter"
          className="absolute inset-0 z-[70]"
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer'
          }}
        />
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
             <Image 
              src="/favicon.ico" 
              alt="Favicon"
              fill
              className="object-contain"
              priority
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

      {/* Favicon sound toggle - replaces mute/unmute icon; visible during initial stage after bait */}
      {baitAccepted && stage === "initial" && (
        <button
          ref={unmuteButtonRef}
          onClick={toggleMute}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 
                     w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                     bg-black/0 hover:bg-black/10 active:bg-black/5
                     rounded-full
                     flex items-center justify-center
                     transition-all duration-300
                     group
                     touch-manipulation"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <div className="w-[70%] h-[70%] relative">
            <Image
              src="/favicon.ico"
              alt={isMuted ? 'Unmute' : 'Mute'}
              fill
              className="object-contain"
              priority
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default WelcomeScreen;
