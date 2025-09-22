import { Nosifer, Jolly_Lodger, Poppins } from "next/font/google";

const nosifer = Nosifer({ weight: "400", subsets: ["latin"] });
const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function Hero() {
  return (
    <section
      className="relative text-white md:w-[100vw] md:h-[95vh]"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full flex justify-end items-start">
        <img
          src="/hero-moon.svg"
          alt="hero-moon illustration"
          className="absolute top-[2%] right-[12%] w-[10vw] h-auto md:w-[12vw]"
        />
      </div>

      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4 md:relative md:top-auto md:left-auto md:translate-x-0 md:flex-row-reverse md:justify-between md:items-center md:my-0">
        <div className="flex flex-col items-center text-center md:items-end md:text-right pr-0 md:pr-[8%] md:pt-[15%]">
          <h1
            className={`${nosifer.className} text-[#FF0700] text-[5vw] md:text-[7vw] leading-none`}
          >
            Hackman
          </h1>
          <h1
            className={`${nosifer.className} text-[4vw] md:text-[5vw] mt-[2vw] md:mt-[1vw] leading-none`}
          >
            v8.o
          </h1>
          <a
            href="/registration"
            className={`${jolly.className} w-[18vw] h-[4vw] md:w-[15vw] md:h-[4vw] mt-[2vw] bg-[#FE772D] text-black font-bold rounded-[3vw] md:rounded-[1rem] text-[3vw] md:text-[2vw] flex items-center justify-center`}
          >
            Register Now
          </a>
        </div>
      </div>

      <p
        className={`${poppins.className} absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[80%] text-center text-[3vw] md:bottom-[8%] md:left-[13%] md:translate-x-0 md:text-[1.5vw] md:w-[95%] md:text-left`}
      >
        Where creativity meets technology. A community of thinkers, builders,
        and leaders shaping the future.
      </p>
    </section>
  );
}
