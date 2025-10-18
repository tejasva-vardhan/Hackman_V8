'use client'

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Sponsors from '@/components/Sponsors';
import Contact from '@/components/Contact';
import Gallery from '@/components/Gallery';
import { AboutHackman } from '@/components/About';
import WelcomeScreen from '@/components/WelcomeScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleIntroComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <WelcomeScreen onComplete={handleIntroComplete} />
      ) : (
        <>
          <Navigation />
          <main className="min-h-screen">
            <section id="hero">
              <Hero />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="about-hackman">
              <AboutHackman />
            </section>
            <section id="faq">
              <FAQ />
            </section>
            <section id="gallery">
              <Gallery />
            </section>
            <section id="sponsors">
              <Sponsors />
            </section>
            <Contact />
          </main>
        </>
      )}
    </>
  );
}