"use client";
import { Nosifer, Jolly_Lodger, Poppins } from "next/font/google";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] });
const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["600", "400"], subsets: ["latin"] });

// Define the array of sponsor data with the second image removed.
const sponsors = [
  { src: "/sponsor1.png", alt: "Sponsor 1", color: "rgb(0, 0, 139)" }, // Dark blue
  { src: "/sponsor3.jpeg", alt: "Sponsor 3", color: "rgb(255, 255, 224)" }, // Light yellow
  { src: "/sponsor4.jpg", alt: "Sponsor 4", color: "rgba(255, 0, 0, 0.54)" }, // Red
  { src: "/sponsor5.png", alt: "Sponsor 5", color: "rgb(255, 215, 0)" }, // Dark yellow
  { src: "/sponsor6.jpg", alt: "Sponsor 6", color: "rgb(0, 0, 128)" }, // Navy blue
  { src: "/sponsor7.jpg", alt: "Sponsor 7", color: "rgb(128, 0, 255)" }, // Violet
  { src: "/sponsor8.png", alt: "Sponsor 8", color: "rgb(0, 150, 136)" }, // Peacock green
  { src: "/sponsor9.png", alt: "Sponsor 9", color: "rgb(0, 119, 190)" }, // Ocean blue
  { src: "/sponsor10.png", alt: "Sponsor 10", color: "rgb(135, 206, 235)" }, // Sky blue
  { src: "/sponsor11.png", alt: "Sponsor 11", color: "rgb(144, 238, 144)" }, // Light green
  { src: "/sponsor12.jpg", alt: "Sponsor 12", color: "rgb(128, 0, 128)" }, // Purple
  { src: "/sponsor13.png", alt: "Sponsor 13", color: "rgb(255, 165, 0)" }, // Orange
  { src: "/sponsor14.jpg", alt: "Sponsor 14", color: "rgb(0, 128, 0)" }, // Green
];

export default function Sponsors() {
  return (
    <section className="py-16 bg-black-60 relative">
      <div className="container mx-auto px-4">
        <h2
          className={`${jolly.className} text-[#FF0700] text-[72px] text-center mb-25`}
        >
          PREVIOUS YEAR SPONSORS
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden w-auto h-36 md:h-48
                         transition-all duration-300
                         hover:scale-110 hover:shadow-2xl"
              style={{
                boxShadow: `0 10px 15px rgba(255, 255, 255, 0.4)`,
                "--hover-color": sponsor.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 20px 5px var(--hover-color)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 15px rgba(255, 255, 255, 0.4)`;
              }}
            >
              <img
                src={sponsor.src}
                alt={sponsor.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}