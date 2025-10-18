"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Nosifer } from "next/font/google";

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
});

// Configurations
const DARKNESS_MS = 800;
const BAT_SWARM_DURATION_MS = 4000;
const FADE_OUT_DURATION_MS = 100;
const AUDIO_GAP_MS = 1000;

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

  useEffect(() => {
    setIsClient(true);

    const isMobileView = window.innerWidth < 768;
    const numberOfBats = isMobileView ? 60 : 80;

    const generatedBats: Bat[] = Array.from({ length: numberOfBats }).map((_, i) => {
      const wave = Math.floor(i / 15);
      const inWave = i % 15;
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 100;

      return {
        id: i,
        startX: 50 + (Math.random() - 0.5) * 15,
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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (audioLoopTimerRef.current) {
        clearTimeout(audioLoopTimerRef.current);
      }
    };
  }, []);

  const handleEnter = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 150);

    const playAudioWithGap = () => {
      if (audioRef.current && !isCompletingRef.current) {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise) {
          playPromise
            .then(() => setAudioEnabled(true))
            .catch(() => console.log("Audio blocked by browser gesture policy"));
        }
      }
    };

    const setupAudioLoop = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.muted = false;
        const handleAudioEnd = () => {
          if (!isCompletingRef.current) {
            audioLoopTimerRef.current = setTimeout(playAudioWithGap, AUDIO_GAP_MS);
          }
        };
        audioRef.current.addEventListener("ended", handleAudioEnd);
        playAudioWithGap();
      }
    };

    setupAudioLoop();

    setStage("darkness");
    setTimeout(() => {
      setStage("bat-swarm");
      setTimeout(() => handleComplete(), BAT_SWARM_DURATION_MS);
    }, DARKNESS_MS);
  };

  const handleComplete = () => {
    isCompletingRef.current = true;
    if (audioLoopTimerRef.current) clearTimeout(audioLoopTimerRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStage("fadeout");
    setOpacity("opacity-0");
    setTimeout(() => onComplete?.(), FADE_OUT_DURATION_MS);
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
          .catch(() => console.log("Could not play audio"));
      } else {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  if (!isClient) {
    return <div className="fixed inset-0 w-screen h-screen z-[9999] bg-black"></div>;
  }

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[9999] overflow-hidden bg-black transition-opacity ${opacity}`}
      style={{
        transitionDuration: stage === "fadeout" ? `${FADE_OUT_DURATION_MS}ms` : "0ms",
      }}
    >
      <audio ref={audioRef} preload="auto">
        <source src="/audio/spooky-intro.mp3" type="audio/mpeg" />
      </audio>

      {showFlash && <div className="absolute inset-0 bg-white pointer-events-none z-50" />}

      {/* ENTER BUTTON */}
      {stage === "initial" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <button
            onClick={handleEnter}
            className={`px-8 py-4 text-red-500 border-2 border-red-600 rounded-lg font-bold text-3xl animate-pulse ${nosifer.className}`}
          >
            ENTER
          </button>
          <button
            onClick={toggleMute}
            className="mt-6 text-sm text-gray-300 underline"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
