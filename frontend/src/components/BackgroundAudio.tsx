"use client";

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/BackgroundAudio.module.css';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    console.log('🎵 BackgroundAudio component mounted');
    // Prevent multiple instances playing the same background track
    try {
      const existing = document.querySelector('audio[data-bg-audio]');
      if (existing && existing !== audioRef.current) {
        console.log('BackgroundAudio: another instance detected, suppressing auto-play for this instance');
        setIsDuplicate(true);
      }
    } catch {}
    
    // Set initial volume
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set to 30% volume
    }

    // Auto-play on mount ONLY
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log('▶️ Auto-play started');
          })
          .catch((error) => {
            console.log('Auto-play prevented:', error);
            setIsPlaying(false);
          });
      }
    };

    // Try to play immediately unless another component requested suppression or this is a duplicate instance
    let suppressed = false;
    try {
      suppressed = typeof window !== 'undefined' && sessionStorage.getItem('suppressBackgroundAudio') === '1';
    } catch {}
    if (!suppressed && !isDuplicate) {
      playAudio();
    } else {
      if (suppressed) console.log('BackgroundAudio: auto-play suppressed by WelcomeScreen transition');
      if (isDuplicate) console.log('BackgroundAudio: duplicate instance, not auto-playing');
    }

    // Also try on ANY user interaction
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        playAudio();
      }
    };

    // Add multiple event listeners for better auto-play
    const events = ['click', 'keypress', 'touchstart', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []); // IMPORTANT: Empty dependency array - only run once on mount

  const togglePlayPause = () => {
    if (audioRef.current) {
      console.log('Current isPlaying state:', isPlaying);
      console.log('Current audio paused:', audioRef.current.paused);
      
      if (audioRef.current.paused) {
        // Audio is paused, play it
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            if (checkboxRef.current) {
              checkboxRef.current.checked = true;
            }
            console.log('▶️ Started playing');
          })
          .catch((error) => {
            console.error('❌ Play failed:', error);
          });
      } else {
        // Audio is playing, pause it
        audioRef.current.pause();
        setIsPlaying(false);
        if (checkboxRef.current) {
          checkboxRef.current.checked = false;
        }
        console.log('⏸️ Paused audio');
      }
    }
  };

  const handleButtonClick = () => {
    togglePlayPause();
  };

  const _handleMessageClick = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          if (checkboxRef.current) {
            checkboxRef.current.checked = true;
          }
        })
        .catch((error) => {
          console.error('Play failed:', error);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        data-bg-audio="true"
        loop
        autoPlay
        onPlay={() => {
          console.log('🎵 Audio is playing');
          setIsPlaying(true);
          if (checkboxRef.current) {
            checkboxRef.current.checked = true;
          }
        }}
        onPause={() => {
          console.log('⏸️ Audio paused');
          setIsPlaying(false);
          if (checkboxRef.current) {
            checkboxRef.current.checked = false;
          }
        }}
        onError={(e) => {
          console.error('❌ Audio error:', e);
        }}
        onLoadedData={() => {
          console.log('✅ Audio loaded successfully');
        }}
      >
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className={styles.audioContainer}>
        <div 
          className={`${styles.botón} ${isPlaying ? styles.active : ''}`}
          onClick={handleButtonClick}
        >
          <div className={styles.fondo}></div>
          <div className={styles.icono}>
            <div className={`${styles.parte} ${styles.izquierda}`}></div>
            <div className={`${styles.parte} ${styles.derecha}`}></div>
          </div>
          <div className={styles.puntero}></div>
          <input
            ref={checkboxRef}
            type="checkbox"
            className={styles.playBtn}
            onChange={togglePlayPause}
            aria-label="Play/Pause music"
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </>
  );
}
