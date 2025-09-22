import type { Metadata } from "next"
import { Geist, Geist_Mono, Jolly_Lodger, Nosifer} from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})


const jolly = Jolly_Lodger({
  variable: "--font-jolly",
  subsets: ["latin"],
  weight: "400", 
})


const nosifer = Nosifer({
  variable: "--font-nosifer",
  subsets: ["latin"],
  weight: "400", 
})

export const metadata: Metadata = {
  title: "Hackman V8 - The Ultimate Hackathon Experience",
  description:
    "Join Hackman V8, the ultimate 48-hour hackathon where innovation meets collaboration. Build amazing projects, win prizes, and connect with fellow developers.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jolly.variable} ${nosifer.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

