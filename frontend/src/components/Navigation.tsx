"use client";
import { Poppins, Jolly_Lodger } from "next/font/google";

const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Navigation() {
  return (
    <>
      <div
        className={`${jolly.className} w-full bg-[#FF6600] text-white text-center py-2 md:h-[5vh] flex items-center justify-center text-[2.5vw] md:text-[1.3rem] tracking-[0.05em] capitalize transform transition-all duration-300 animate-slide-down`}
        style={{
          animation: "slideDown 0.8s ease-out forwards",
        }}
      >
        <p className="leading-[140%] animate-fade-in" style={{
          animation: "fadeIn 1s ease-out 0.3s forwards",
          opacity: 0,
        }}>
          Registrations are now open for Hackman… if you dare to enter.
        </p>
      </div>
      <nav
        className={`bg-black text-white w-full ${poppins.className} px-4 py-4 md:px-12 md:py-2 flex items-center justify-between transform transition-all duration-300 animate-fade-in-up`}
        style={{
          animation: "fadeInUp 0.8s ease-out 0.2s forwards",
          opacity: 0,
        }}
      >
        <div className="flex flex-1 items-center justify-start space-x-6 md:space-x-12">
          <ul className="flex space-x-4 md:space-x-8 text-[3vw] md:text-[1rem] font-medium">
            <li className="animate-fade-in-stagger" style={{
              animation: "fadeIn 0.6s ease-out 0.5s forwards",
              opacity: 0,
            }}>
              <a 
                href="#hero" 
                className="hover:text-gray-400 transition-all duration-300 hover:scale-105 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="animate-fade-in-stagger" style={{
              animation: "fadeIn 0.6s ease-out 0.6s forwards",
              opacity: 0,
            }}>
              <a 
                href="#about-hackman" 
                className="hover:text-gray-400 transition-all duration-300 hover:scale-105 relative group"
              >
                About Hackman
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="animate-fade-in-stagger" style={{
              animation: "fadeIn 0.6s ease-out 0.7s forwards",
              opacity: 0,
            }}>
              <a 
                href="#about-genesis" 
                className="hover:text-gray-400 transition-all duration-300 hover:scale-105 relative group"
              >
                About Genesis
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="animate-fade-in-stagger" style={{
              animation: "fadeIn 0.6s ease-out 0.8s forwards",
              opacity: 0,
            }}>
              <a 
                href="#sponsors" 
                className="hover:text-gray-400 transition-all duration-300 hover:scale-105 relative group"
              >
                Sponsors
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="animate-fade-in-stagger" style={{
              animation: "fadeIn 0.6s ease-out 0.9s forwards",
              opacity: 0,
            }}>
              <a 
                href="#gallery" 
                className="hover:text-gray-400 transition-all duration-300 hover:scale-105 relative group"
              >
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>
      
        <div className="flex-shrink-0 animate-fade-in" style={{
          animation: "fadeIn 0.8s ease-out 1s forwards",
          opacity: 0,
        }}>
          <img
            src="/genesis-2k25-logo.png"
            alt="Genesis 2025 Logo"
            className="h-12 md:h-16 transform transition-all duration-300 hover:scale-110 hover:rotate-3"
          />
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
    </>
  );
}