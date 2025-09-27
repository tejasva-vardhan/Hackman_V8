"use client";
import { Poppins, Jolly_Lodger } from "next/font/google";

const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});
// not in use for now...
export function OrangeStrip() {
  return (
    <div
      className={`${jolly.className} w-full bg-[#FF6600] text-white text-center py-3 md:py-2 md:h-[6.5vh] flex items-center justify-center text-[clamp(16px,2.5vw,24px)] md:text-[1.45rem] tracking-[0.05em] z-50 animate-slide-down`}
      style={{
        animation: "slideDown 0.8s ease-out forwards",
      }}
    >
      <p
        className="leading-[140%] animate-fade-in px-2"
        style={{
          animation: "fadeIn 1s ease-out 0.3s forwards",
          opacity: 0,
        }}
      >
        Registrations Are Now Open For Hackman… If You Dare To Enter.
      </p>
    </div>
  );
}

export default function Navigation() {
  return (
    <>
      <div
        className={`${jolly.className} w-full bg-[#FF6600] text-white text-center py-3 md:py-2 md:h-[6.5vh] flex items-center justify-center text-[clamp(16px,2.5vw,24px)] md:text-[1.45rem] tracking-[0.05em] z-50 animate-slide-down`}
        style={{
          animation: "slideDown 0.8s ease-out forwards",
        }}
      >
        <p
          className="leading-[140%] animate-fade-in px-2"
          style={{
            animation: "fadeIn 1s ease-out 0.3s forwards",
            opacity: 1,
          }}
        >
          Registrations Are Now Open For Hackman… If You Dare To Enter.
        </p>
      </div>
      <nav
        className={`fixed left-4 right-4 top- bg-black/50 backdrop-blur-lg text-white ${poppins.className} px-6 py-3 md:px-16 md:py-2 flex flex-col md:flex-row items-center justify-between z-50 animate-fade-in-up gap-4 md:gap-0 rounded-2xl shadow-lg`}
        style={{
          animation: "fadeInUp 0.8s ease-out 0.2s forwards",
          opacity: 1,
        }}
      >
        <ul className="flex flex-wrap justify-center gap-2 md:gap-6 lg:gap-8 text-[clamp(14px,3vw,18px)] md:text-[1.1rem] lg:text-[1.2rem] order-2 md:order-1">
          {[
            { href: "#hero", label: "Home", delay: 0.5 },
            { href: "#about-hackman", label: "About Hackman", delay: 0.6 },
            { href: "#about", label: "About Genesis", delay: 0.7 },
            { href: "#sponsors", label: "Sponsors", delay: 0.8 },
            { href: "#gallery", label: "Gallery", delay: 0.9 },
            { href: "/dashboard", label: "Dashboard", delay: 1.0 },
            { href: "/registration", label: "Register", delay: 1.1 },
          ].map((item, idx) => (
            <li
              key={idx}
              className="flex"
              style={{
                animation: `fadeIn 0.6s ease-out ${item.delay}s forwards`,
                opacity: 1,
              }}
            >
              <a
                href={item.href}
                className="relative group flex items-center px-3 py-2 hover:text-gray-400 transition-all duration-500 transform hover:scale-105"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500 group-hover:w-full group-hover:shadow-lg group-hover:shadow-orange-400/50"></span>
              </a> 
            </li>
          ))}
        </ul>
        <div
          className="order-1 md:order-2 flex-shrink-0"
          style={{
            animation: "fadeIn 0.8s ease-out 1s forwards",
            opacity: 1,
          }}
        >
          <img
            src="/genesis-2k25-logo.png"
            alt="Genesis 2025 Logo"
            className="h-12 md:h-16 lg:h-20 transform transition-all duration-300 hover:scale-110 hover:rotate-3"
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

        nav ul li a {
          position: relative;
          z-index: 10;
        }

        nav ul li a::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          z-index: -1;
        }

        @media (max-width: 768px) {
          nav {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          nav ul {
            gap: 0.5rem;
          }
          
          nav ul li a {
            padding: 0.75rem 1rem;
            font-size: clamp(12px, 3.5vw, 16px);
          }
        }
      `}</style>
    </>
  );
}