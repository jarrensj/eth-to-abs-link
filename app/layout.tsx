import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./Web3Provider";
import PixelBackground from "./components/PixelBackground";
import Unicorns from "./components/Unicorns";
import ParticleBackground from "./components/ParticleBackground";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Pixel Corn",
  description: "Where unicorns can be unicorns! Best corns 4ever!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Web3Provider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased`}
        >
          <ParticleBackground />
          <PixelBackground />
          <Unicorns />
          {children}
          <Analytics />
        </body>
      </Web3Provider>
    </html>
  );
}
