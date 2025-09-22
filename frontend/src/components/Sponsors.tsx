import { Nosifer, Jolly_Lodger, Poppins } from "next/font/google";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] });
const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["600","400"], subsets: ["latin"] });



export default function Sponsors() {
  return (
    <section className="py-16 bg-black-60 relative">
  <div className="container mx-auto px-4">
    <h2
      className={`${jolly.className} text-[#FF0700] text-[72px] text-center mb-25`}
    >
      PREVIOUS YEAR SPONSOR
    </h2>
    
    <div className="flex flex-wrap justify-center gap-65">
  <img
    src="/sponsor1.png"
    alt="Sponsor 1"
    className="h-36 md:h-48 w-auto transform transition duration-300 hover:scale-110 shadow-[0_10px_15px_rgba(255,255,255,0.4)]"
  />
  <img
    src="/sponsor2.png"
    alt="Sponsor 2"
    className="h-36 md:h-48 w-auto transform transition duration-300 hover:scale-110 shadow-[0_10px_15px_rgba(255,255,255,0.4)]"
  />
  <img
    src="/sponsor3.jpeg"
    alt="Sponsor 3"
    className="h-36 md:h-48 w-auto transform transition duration-300 hover:scale-110 shadow-[0_10px_15px_rgba(255,255,255,0.4)]"
  />
  
</div>

  </div>
  
</section>

    
  );
}
