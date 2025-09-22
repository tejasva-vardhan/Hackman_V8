import { Geist, Geist_Mono, Creepster, Jolly_Lodger } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jollyLodger = Jolly_Lodger({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jolly-lodger",
  display: "swap",
});

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
  display: "swap",
});

export const metadata = {
  title: "Hackman V8 - The Ultimate Hackathon Experience",
  description:
    "Join Hackman V8, the ultimate 48-hour hackathon where innovation meets collaboration. Build amazing projects, win prizes, and connect with fellow developers.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jollyLodger.variable} ${creepster.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}