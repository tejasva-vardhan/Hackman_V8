import React from 'react';
import { Jolly_Lodger,Poppins} from "next/font/google";
import Image from "next/image";

const jollyLodger = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Contact() {
  return (
    <section className="min-h-screen flex flex-col bg-[#000000] text-white relative overflow-hidden">
  <Image
    src="/spider-web.svg"
    alt="Spider Web"
    width={200}
    height={200}
    className="absolute top-[17vw] left-0 w-[30vw] max-w-[200px] h-auto opacity-100 z-0 hidden sm:block"
  />
  <Image
    src="/spider-web-right.svg"
    alt="Spider Web"
    width={200}
    height={200}
    className="absolute top-[11vw] right-[0vw] w-[30vw] max-w-[200px] h-auto opacity-100 z-0 hidden sm:block"
  />
  <Image
    src="/spider.png"
    alt="Hanging Spider"
    width={70}
    height={70}
    className="absolute top-[-14vw] left-[12vw] w-[10vw] max-w-[70px] z-10 hidden sm:block"
  />

  <div className="absolute bottom-[35vw] right-[20vw] flex items-end space-x-[-10px] z-20 hidden md:flex">
    <Image src="/pumpkin-evil.png" alt="Spooky Pumpkin" width={92} height={96} className="w-[60px] md:w-[92px] h-[60px] md:h-[96px]" />
    <Image src="/pumpkin-evil.png" alt="Another Spooky Pumpkin" width={62} height={57} className="w-[40px] md:w-[62px] h-[40px] md:h-[57px]" />
  </div>

  <div className="relative z-10 flex flex-col items-center max-w-[700px] mx-auto justify-start pt-10 md:pt-20 px-4 pb-10">
    <h2 className={`${jollyLodger.className} text-[#FF0000] text-5xl md:text-7xl lg:text-8xl text-center mb-8 md:mb-12`}>
      Contact Us
    </h2>
    <div className="w-full space-y-4 md:space-y-6">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-3 md:p-4 bg-[#121212] rounded-lg focus:outline-none placeholder-gray-500"
      />
      <input
        type="email"
        placeholder="Your Email Id"
        className="w-full p-3 md:p-4 bg-[#121212] rounded-lg focus:outline-none placeholder-gray-500"
      />
      <textarea
        placeholder="Message"
        rows={4}
        className="w-full p-3 md:p-4 bg-[#121212] rounded-lg focus:outline-none placeholder-gray-500 resize-none"
      />
    </div>
  </div>
      
  <footer 
    className="relative w-full h-[150px] md:h-[500px] z-20 flex flex-col justify-center items-center text-center"
    style={{
      backgroundColor: 'rgba(0,0,0,0.1)',
      backgroundImage: "url('/grass.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'bottom center',
      backgroundRepeat: 'no-repeat'
    }}>
    <Image
      src="/genesis-2k25-logo.png"
      alt="Genesis 2025 Logo"
      width={150}
      height={150}
      className="mb-4 md:mb-6 mt-8 md:mt-50 w-[100px] md:w-[150px] h-auto filter brightness-75"
    />

    <nav className={`${poppins.className} flex flex-wrap justify-center space-x-4 md:space-x-8 text-gray-300 text-xs md:text-sm`}>
      <a href="#hero" className="hover:text-red-500 transition-colors duration-220">Home</a>
      <a href="#events" className="hover:text-red-500 transition-colors duration-220">Events</a>
      <a href="#sponsors" className="hover:text-red-500 transition-colors duration-220">Sponsors</a>
      <a href="#leads" className="hover:text-red-500 transition-colors duration-220">Leads</a>
      <a href="#gallery" className="hover:text-red-500 transition-colors duration-220">Gallery</a>
      <a href="#members" className="hover:text-red-500 transition-colors duration-220">Members</a>
    </nav>

    <p className="w-full text-center text-xs text-[#555555] py-2 md:mt-5">
    Made With <span className="text-red-500">❤️</span> By Genesis. All Rights Reserved.
    </p>
  </footer>

</section>
  );
} 