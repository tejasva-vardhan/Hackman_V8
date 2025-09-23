"use client";
import { Nosifer, Jolly_Lodger, Poppins } from "next/font/google";
import { useState } from "react";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] });
const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: ["600", "400"], subsets: ["latin"] });

const sponsors = [
  { id: 1, src: "/sponsor1.png", alt: "Sponsor 1", color: "rgb(0, 0, 139)" },
  
  { id: 3, src: "/sponsor3.jpeg", alt: "Sponsor 3", color: "rgb(255, 255, 224)" },
  { id: 4, src: "/sponsor4.jpg", alt: "Sponsor 4", color: "rgb(255, 0, 0)" },
  { id: 5, src: "/sponsor5.png", alt: "Sponsor 5", color: "rgb(255, 215, 0)" },
  { id: 6, src: "/sponsor6.jpg", alt: "Sponsor 6", color: "rgb(0, 0, 128)" },
  { id: 7, src: "/sponsor7.jpg", alt: "Sponsor 7", color: "rgb(128, 0, 255)" },
  { id: 8, src: "/sponsor8.png", alt: "Sponsor 8", color: "rgb(0, 150, 136)" },
  { id: 9, src: "/sponsor9.png", alt: "Sponsor 9", color: "rgb(0, 119, 190)" },
  { id: 10, src: "/sponsor10.png", alt: "Sponsor 10", color: "rgb(135, 206, 235)" },
  { id: 11, src: "/sponsor11.png", alt: "Sponsor 11", color: "rgb(144, 238, 144)" },
  { id: 12, src: "/sponsor12.jpg", alt: "Sponsor 12", color: "rgb(128, 0, 128)" },
  { id: 13, src: "/sponsor13.png", alt: "Sponsor 13", color: "rgb(255, 165, 0)" },
  { id: 14, src: "/sponsor14.jpg", alt: "Sponsor 14", color: "rgb(0, 128, 0)" },
];

export default function Sponsors() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  return (
    <section className="py-16 bg-black-60 relative">
      <div className="container mx-auto px-4">
        <h2
          className={`${jolly.className} text-[#FF0700] text-[72px] text-center mb-25`}
        >
          PREVIOUS YEAR SPONSOR
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className={`relative rounded-lg overflow-hidden w-auto h-36 md:h-48 transition-all duration-300 hover:scale-110`}
              style={{
                boxShadow:
                  hoveredImage === sponsor.id
                    ? `0 10px 20px 5px ${sponsor.color}`
                    : `0 10px 15px rgba(255, 255, 255, 0.4)`,
              }}
              onMouseEnter={() => setHoveredImage(sponsor.id)}
              onMouseLeave={() => setHoveredImage(null)}
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