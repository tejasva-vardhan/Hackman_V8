"use client";
import React from "react";
import { Jolly_Lodger } from "next/font/google";
import Image from "next/image";

const jolly = Jolly_Lodger({ weight: "400", subsets: ["latin"] });

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
  const hoverShadowColors = [
    'rgba(173, 216, 230, 1)', // 1 light blue
    'rgba(255, 255, 255, 0.9)', // 2 white
    'rgba(255, 0, 0, 1)',     // 3 red
    'rgba(255, 215, 0, 1)',   // 4 yellow
    'rgba(0, 0, 139, 1)',     // 5 dark blue
    'rgba(128, 0, 128, 1)',   // 6 purple
    'rgba(0, 100, 0, 1)',     // 7 dark green
    'rgba(0, 119, 190, 1)',   // 8 ocean blue
    'rgba(135, 206, 235, 1)', // 9 sky blue
    'rgba(144, 238, 144, 1)', // 10 light green
    'rgba(238, 130, 238, 1)', // 11 violet
    'rgba(255, 165, 0, 1)',   // 12 orange
    'rgba(0, 100, 0, 1)',     // 13 dark green
  ];

  return (
    <section className="py-16 bg-black-60 relative">
      <div className="container mx-auto px-4">
        <h2
          className={`${jolly.className} text-[#FF0700] text-[72px] text-center mb-12`}
        >
          PREVIOUS YEAR SPONSORS
        </h2>

        <div className="relative overflow-hidden">
          <div className="marquee">
            <div className="marquee-inner flex flex-nowrap items-center gap-10">
              {sponsors.map((sponsor, index) => (
              <div
                key={`${sponsor.id}-${index}`}
                className={`item h-36 md:h-60 flex-shrink-0 flex items-center justify-center`}
                style={{ '--shadow-color': hoverShadowColors[index % hoverShadowColors.length] } as React.CSSProperties}
              >
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  width={200}
                  height={160}
                  className="w-auto h-28 md:h-40 object-contain rounded-lg transform transition-transform duration-300 hover:scale-110"
                  draggable={false}
                />
              </div>
              ))}
              {sponsors.map((sponsor, index) => (
               <div
                 key={`dup-${sponsor.id}-${index}`}
                 className={`item h-36 md:h-48 flex-shrink-0 flex items-center justify-center`}
                 style={{ '--shadow-color': hoverShadowColors[index % hoverShadowColors.length] } as React.CSSProperties}
               >
                 <Image
                   src={sponsor.src}
                   alt={sponsor.alt}
                   width={200}
                   height={160}
                   className="w-auto h-28 md:h-40 object-contain rounded-lg transform transition-transform duration-300 hover:scale-110"
                   draggable={false}
                 />
               </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .marquee { overflow: hidden; }
        .marquee-inner {
          will-change: transform;
          width: max-content;
          animation: marquee-scroll 36s linear infinite;
        }
        .item:hover img {
          filter: drop-shadow(0 0 12px var(--shadow-color));
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}