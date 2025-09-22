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
      {/* Orange Announcement Bar */}
      <div
        className={`${jolly.className}  w-full bg-[#FF6600] text-white text-center py-2 md:h-[6.5vh] flex items-center justify-center text-[2.5vw] md:text-[1.45rem] tracking-[0.05em] z-50 animate-slide-down`}
        style={{
          animation: "slideDown 0.8s ease-out forwards",
        }}
      >
        <p
          className="leading-[140%] animate-fade-in"
          style={{
            animation: "fadeIn 1s ease-out 0.3s forwards",
            opacity: 0,
          }}
        >
          Registrations Are Now Open For Hackman… If You Dare To Enter.
        </p>
      </div>

      {/* Main Navbar */}
      <nav
        className={`  w-full bg-black text-white ${poppins.className} px-4 py-5 md:px-20 md:py-8 flex items-center justify-between z-50 animate-fade-in-up `}
        style={{
          animation: "fadeInUp 0.8s ease-out 0.2s forwards",
          opacity: 0,
        }}
      >
        {/* Links */}
        <ul className="flex space-x-6 md:space-x-10 text-[3vw] md:text-[1.2rem]">
          {[
            { href: "#hero", label: "Home", delay: 0.5 },
            { href: "#about-hackman", label: "About Hackman", delay: 0.6 },
            { href: "#about-genesis", label: "About Genesis", delay: 0.7 },
            { href: "#sponsors", label: "Sponsors", delay: 0.8 },
            { href: "#gallery", label: "Gallery", delay: 0.9 },
          ].map((item, idx) => (
            <li
              key={idx}
              style={{
                animation: `fadeIn 0.6s ease-out ${item.delay}s forwards`,
                opacity: 0,
              }}
            >
              <a
                href={item.href}
                className="hover:text-gray-400 transition-all duration-300 hover:scale-105 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Logo */}
        <div
          style={{
            animation: "fadeIn 0.8s ease-out 1s forwards",
            opacity: 0,
          }}
        >
          <img
            src="/genesis-2k25-logo.png"
            alt="Genesis 2025 Logo"
            className="h-12 md:h-17 transform transition-all duration-300 hover:scale-110 hover:rotate-3"
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
