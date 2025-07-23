// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import SessionWrapper from "@/components/SessionWrapper";
import Silk from "@/components/Silk";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Resonix",
  description: "Your smart job platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <div className="absolute inset-0 -z-10">
                <Silk
                  speed={10}
                  scale={1}
                  color="170123"
                  noiseIntensity={1.5}
                  rotation={0}
                />
              </div>
        <SessionWrapper>
            <Navbar/>
            
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
