"use client";
import Image from "next/image";
import { Nosifer, Jolly_Lodger, Poppins } from "next/font/google";

const nosifer = Nosifer({ weight: "400", subsets: ["latin"] });
const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });


export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center -mt-[1px]"
      style={{
        backgroundImage: "url('/Hero/hero-bg.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Image src="/Hero/botton.png" alt="" width={1450} height={20} className="absolute bottom-[-6%]" />
        <Image src="/Hero/house.png" alt="" width={490} height={20} className="absolute bottom-32 left-1.9 h-[72.5%]"/>
        <Image src="/Hero/witch.png" alt="" width={70} height={20} className="absolute right-155 top-18 "/> 
        <Image src="/Hero/moon.png" alt="" width={90} height={20} className="absolute right-73 top-[-78] w-[13%]" />
        <Image src="/Hero/pumpkin evil.png" alt="" width={92} height={20} className="absolute right-18 bottom-30 h-[12%]"/>
        <Image src="/Hero/Vector.png" alt="" width={30} height={20} className="absolute bottom-[16%] right-[43%]" />
        <Image src="/Hero/Vector-4.png" alt="" width={40} height={20} className="absolute bottom-[16%] right-[44%]" />
        <Image src="/Hero/Vector-7.png" alt="" width={35} height={10} className="absolute bottom-[17.5%] right-[41.5%]" />
        <Image src="/Hero/Vector-2.png" alt="" width={30} height={10} className="absolute bottom-[17.5%] right-[40%]" />
        <Image src="/Hero/Vector-1.png" alt="" width={20} height={10}className="absolute bottom-[17.5%] right-[39%]" />
        <Image src="/Hero/ghost.png" alt="" width={85} height={10}className="absolute bottom-[16%] right-[35%]" />
        <Image src="/Hero/Vector-3.png" alt="" width={55} height={10} className="absolute bottom-[13%] right-[36%]" />
        <Image src="/Hero/Vector-5.png" alt="" width={30} height={10} className="absolute bottom-[17.5%] right-[34%]" />
        <Image src="/Hero/Vector-8.png" alt="" width={25} height={10} className="absolute bottom-[13%] right-[32.5%]" />
        <Image src="/Hero/Vector-6.png" alt="" width={35} height={10} className="absolute bottom-[14%] right-[28%]" />
      </div>
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4 lg:relative lg:top-[-8%] lg:left-[-15] lg:translate-x-0 lg:flex-row-reverse lg:justify-between lg:items-center lg:my-0 ">
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
            className={`${nosifer.className} text-[4vw] lg:text-[4.6vw] mt-[2vw] lg:mt-[1.6vw] leading-none animate-fade-in-up text-white`}
            style={{
              animation: "fadeInUp 1.2s ease-out 0.3s forwards",
              opacity: 0,
            }}
          >
            v8.o
          </h1>

          <a
            href="/registration"
            className={`${jolly.className} w-[18vw] h-[4vw] lg:w-[19vw] lg:h-[4.5vw] mt-[2vw] bg-[#FE772D] text-gray-800 rounded-[3vw] lg:rounded-[1rem] text-[3vw] lg:text-[2.8vw] flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:bg-[#E5691F] hover:shadow-xl animate-fade-in-up lg:mt-[8%]`}
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
        className={ `${poppins.className} absolute bottom-[10%] left-[16%] text-xl text-white`}
      >
        Where creativity meets technology. A community of thinkers, builders,
        and leaders shaping the future.
      </p>
    </section>
  );
}
