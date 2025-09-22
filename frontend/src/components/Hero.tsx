"use client";
import { Nosifer, Jolly_Lodger, Poppins } from "next/font/google";

const nosifer = Nosifer({ weight: "400", subsets: ["latin"] });
const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function Hero() {
  return (
    <section
      className="relative text-white lg:w-[100vw] lg:h-[100vh] xl:mb-[3%] md:mb-[2%] 2xl:mb-[6%] lg:mb-[3%]"
      style={{
        backgroundImage: "url('/hero-bg2.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full flex justify-end items-start">
        <img
          src="/hero-moon.svg"
          alt="hero-moon illustration"
          className="absolute top-[2%] right-[12%] w-[10vw] h-auto lg:w-[12vw] animate-pulse"
        />
      </div>

      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4 lg:relative lg:top-auto lg:left-auto lg:translate-x-0 lg:flex-row-reverse lg:justify-between lg:items-center lg:my-0">
        <div className="flex flex-col items-center text-center lg:items-end lg:text-right pr-0 lg:pr-[8%] lg:pt-[15%]">
          <h1
            className={`${nosifer.className} text-[#FF0700] text-[5vw] lg:text-[7vw] leading-none animate-fade-in-up`}
            style={{
              animation: "fadeInUp 1.2s ease-out forwards",
            }}
          >
            Hackman
          </h1>
          <h1
            className={`${nosifer.className} text-[4vw] lg:text-[5vw] mt-[2vw] lg:mt-[1vw] leading-none animate-fade-in-up`}
            style={{
              animation: "fadeInUp 1.2s ease-out 0.3s forwards",
              opacity: 0,
            }}
          >
            v8.o
          </h1>
          
            <a href="/registration"
            className={`${jolly.className} w-[18vw] h-[4vw] lg:w-[15vw] lg:h-[4vw] mt-[2vw] bg-[#FE772D] text-black font-bold rounded-[3vw] lg:rounded-[1rem] text-[3vw] lg:text-[2vw] flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:bg-[#E5691F] hover:shadow-xl animate-fade-in-up`}
            style={{
              animation: "fadeInUp 1.2s ease-out 0.6s forwards",
              opacity: 0,
            }}
          >
            Register Now
          </a>
        </div>
      </div>

      <p
        className={`${poppins.className} absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[80%] text-center text-[3vw] lg:bottom-[3%] lg:left-[13%] lg:translate-x-0 lg:text-[1.5vw] lg:w-[95%] lg:text-left xl:bottom-[-6%] 2xl:bottom-[-4%] bg-transparent animate-fade-in`}
        style={{
          animation: "fadeIn 1.5s ease-out 1s forwards",
          opacity: 0,
        }}
      >
        Where creativity meets technology. A community of thinkers, builders,
        and leaders shaping the future.
      </p>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}