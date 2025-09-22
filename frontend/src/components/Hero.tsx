import { Nosifer, Jolly_Lodger, Poppins } from "next/font/google";

const nosifer = Nosifer({ weight: "400", subsets: ["latin"] });
const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["400"], subsets: ["latin"] });

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center text-white md:w-[100vw] md:pb-[3%] bg-black"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col md:ml-[42%]">
        <img
          src="/hero-moon.svg"
          alt="hero-moon illustration"
          className="md:w-[20%] md:ml-[52%] md:mt-[-2%]"
        />

        <h1
          className={`${nosifer.className} text-[#FF0700] text-[110px] md:text-[3.2rem]`}
        >
          Hackman
        </h1>

        <h1
          className={`${nosifer.className} text-[89px] md:text-[3rem] md:ml-[44%] md:mt-[-4%]`}
        >
          v8.o
        </h1>

        <a
          href="/registration"
          className={`${jolly.className} w-[264px] h-[67px]  bg-[#FE772D] text-black font-bold rounded-[17.64px] text-[40px] flex items-center justify-center md:text-[1.2rem] md:w-[25%] md:h-[8%] md:rounded-[0.8rem] md:ml-[51%]`}
        >
          Register Now
        </a>
      </div>
      <p className={`${poppins.className} text-[20px] md:text-[0.7rem] md:ml-[13%] md:mt-[10%]`}>
        Where creativity meets technology. A community of thinkers, builders,
        and leaders shaping the future.
      </p>
    </section>
  );
}
