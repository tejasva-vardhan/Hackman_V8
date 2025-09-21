import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Sponsors from '@/components/Sponsors';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <section id="sponsors">
          <Sponsors />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}
