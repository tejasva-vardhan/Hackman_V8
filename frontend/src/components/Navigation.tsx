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
        className={`${jolly.className} w-full bg-[#FF6600] text-white text-center py-2 md:h-[5vh] flex items-center justify-center text-[2.5vw] md:text-[1.3rem] tracking-[0.05em] capitalize`}
      >
        <p className="leading-[140%]">Registrations are now open for Hackman… if you dare to enter.</p>
      </div>
      <nav
        className={`bg-black text-white w-full ${poppins.className} px-4 py-4 md:px-12 md:py-2 flex items-center justify-between`}
      >
        <div className="flex flex-1 items-center justify-start space-x-6 md:space-x-12">
          <ul className="flex space-x-4 md:space-x-8 text-[3vw] md:text-[1rem] font-medium">
            <li>
              <a href="#hero" className="hover:text-gray-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#about-hackman" className="hover:text-gray-400 transition-colors">
                About Hackman
              </a>
            </li>
            <li>
              <a href="#about-genesis" className="hover:text-gray-400 transition-colors">
                About Genesis
              </a>
            </li>
            <li>
              <a href="#sponsors" className="hover:text-gray-400 transition-colors">
                Sponsors
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-gray-400 transition-colors">
                Gallery
              </a>
            </li>
          </ul>
        </div>
      
        <div className="flex-shrink-0">
          <img
            src="/genesis-2k25-logo.png"
            alt="Genesis 2025 Logo"
            className="h-12 md:h-16"
          />
        </div>
      </nav>
    </>
  );
}