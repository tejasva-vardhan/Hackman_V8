"use client";
import Image from "next/image";
import { Nosifer, Jolly_Lodger, Poppins } from "next/font/google";
import { useEffect, useRef } from "react";
import Navigation from "./Navigation";

const nosifer = Nosifer({ weight: "400", subsets: ["latin"] });
const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          } else {
            entry.target.classList.remove("animate-in");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes fly {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(5px) rotate(2deg); }
          50% { transform: translateY(-5px) translateX(-5px) rotate(-1deg); }
          75% { transform: translateY(-10px) translateX(3px) rotate(1deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }

        @keyframes ghostFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(-10px) translateX(5px) scale(1.02); }
          66% { transform: translateY(-5px) translateX(-3px) scale(0.98); }
        }

        @keyframes batFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-8px) translateX(3px) rotate(5deg); }
          50% { transform: translateY(-12px) translateX(-2px) rotate(-3deg); }
          75% { transform: translateY(-6px) translateX(4px) rotate(2deg); }
        }

        @keyframes fadeInUp {
          0% { 
            opacity: 0;
            transform: translateY(30px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes houseGlow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 5px rgba(255, 120, 0, 0.3)); }
          50% { filter: brightness(1.1) drop-shadow(0 0 15px rgba(255, 120, 0, 0.6)); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fly {
          animation: fly 8s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        .animate-ghost-float {
          animation: ghostFloat 5s ease-in-out infinite;
        }

        .animate-bat-float {
          animation: batFloat 3s ease-in-out infinite;
        }

        .animate-bat-float-delay-1 {
          animation: batFloat 3.5s ease-in-out infinite 0.2s;
        }

        .animate-bat-float-delay-2 {
          animation: batFloat 4s ease-in-out infinite 0.4s;
        }

        .animate-house-glow {
          animation: houseGlow 8s ease-in-out infinite;
        }
          
        .animate-in .hero-title {
          animation: fadeInUp 1.2s ease-out forwards;
        }

        .animate-in .hero-subtitle {
          animation: fadeInUp 1.2s ease-out 0.3s forwards;
        }

        .animate-in .hero-button {
          animation: fadeInUp 1.2s ease-out 0.6s forwards;
        }

        .animate-in .hero-text {
          animation: fadeInUp 1.2s ease-out 0.9s forwards;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
        }
      `}</style>
      <section
        ref={sectionRef}
        className="relative w-full min-h-[120vh] h-screen bg-cover bg-center -mt-[1px] overflow-hidden"
        style={{
          backgroundImage: "url('/Hero/hero-bg.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <Navigation /> */}

        <div>
          <Image 
            src="/Hero/botton.png" 
            alt="" 
            width={1450} 
            height={20} 
            className="absolute bottom-[-4%] " 
          />
          <Image 
            src="/Hero/house.png" 
            alt="" 
            width={490} 
            height={20} 
            className="absolute bottom-32 left-1.9 h-[72.5%] " 
          />
          <Image 
            src="/Hero/witch.png" 
            alt="" 
            width={70} 
            height={20} 
            className="absolute right-155 top-54 animate-fly" 
          /> 
          <Image 
            src="/Hero/witch.png" 
            alt="" 
            width={70} 
            height={20} 
            className="absolute right-50 top-32 animate-fly" 
          /> 
          <Image 
            src="/Hero/moon.png" 
            alt="" 
            width={90} 
            height={20} 
            className="absolute right-73 top-[10%] w-[13%] animate-float" 
          />
          <Image 
            src="/Hero/pumpkin evil.png" 
            alt="" 
            width={92} 
            height={20} 
            className="absolute right-18 bottom-30 h-[12%] animate-pulse" 
          />
          <Image 
            src="/Hero/Vector.png" 
            alt="" 
            width={30} 
            height={20} 
            className="absolute bottom-[16%] right-[43%] animate-bat-float" 
          />
          <Image 
            src="/Hero/Vector-4.png" 
            alt="" 
            width={40} 
            height={20} 
            className="absolute bottom-[16%] right-[44%] animate-bat-float-delay-1" 
          />
          <Image 
            src="/Hero/Vector-7.png" 
            alt="" 
            width={35} 
            height={10} 
            className="absolute bottom-[17.5%] right-[41.5%] animate-bat-float-delay-2" 
          />
          <Image 
            src="/Hero/Vector-2.png" 
            alt="" 
            width={30} 
            height={10} 
            className="absolute bottom-[17.5%] right-[40%] animate-bat-float" 
          />
          <Image 
            src="/Hero/Vector-1.png" 
            alt="" 
            width={20} 
            height={10} 
            className="absolute bottom-[17.5%] right-[39%] animate-bat-float-delay-1" 
          />
          <Image 
            src="/Hero/ghost.png" 
            alt="" 
            width={85} 
            height={10} 
            className="absolute bottom-[16%] right-[35%] animate-ghost-float" 
          />
          <Image 
            src="/Hero/Vector-3.png" 
            alt="" 
            width={55} 
            height={10} 
            className="absolute bottom-[13%] right-[36%] animate-bat-float-delay-2" 
          />
          <Image 
            src="/Hero/Vector-5.png" 
            alt="" 
            width={30} 
            height={10} 
            className="absolute bottom-[17.5%] right-[34%] animate-bat-float" 
          />
          <Image 
            src="/Hero/Vector-8.png" 
            alt="" 
            width={25} 
            height={10} 
            className="absolute bottom-[13%] right-[32.5%] animate-bat-float-delay-1" 
          />
          <Image 
            src="/Hero/Vector-6.png" 
            alt="" 
            width={35} 
            height={10} 
            className="absolute bottom-[14%] right-[28%] animate-bat-float-delay-2" 
          />
        </div>
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4 lg:relative lg:top-[-8%] lg:left-[-15] lg:translate-x-0 lg:flex-row-reverse lg:justify-between lg:items-center lg:my-0 ">
          <div className="mt-40 flex flex-col items-center text-center lg:items-end lg:text-right pr-0 lg:pr-[8%] lg:pt-[15%]">
            <h1
              className={`${nosifer.className} hero-title text-[#FF0700] text-[5vw] lg:text-[7vw] leading-none hover-lift opacity-0`}
            >
              Hackman
            </h1>
            <h1
              className={`${nosifer.className} hero-subtitle text-[4vw] lg:text-[4.6vw] mt-[2vw] lg:mt-[1.6vw] leading-none text-white hover-lift opacity-0`}
            >
              v8.o
            </h1>

            <a
              href="/registration"
              className={`${jolly.className} hero-button w-[22vw] h-[5vw] lg:w-[20vw] lg:h-[5vw] mt-[2vw] bg-gradient-to-r from-[#FF0500] to-[#FE772D] text-white font-bold rounded-[3vw] lg:rounded-[1.5rem] text-[3.2vw] lg:text-[2.5vw] flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 lg:mt-[8%] hover-lift opacity-0 uppercase tracking-wider relative overflow-hidden group`}
            >
              <span className="relative z-10">Register Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FE772D] to-[#FF0500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
          </div>
        </div>
        <p
          className={`${poppins.className} hero-text absolute bottom-[10%] left-[16%] text-xl text-white hover-lift opacity-0`}
        >
          Where creativity meets technology. A community of thinkers, builders,
          and leaders shaping the future.
        </p>
      </section>
    </>
  );
}