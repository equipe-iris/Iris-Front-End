import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import AppProvider from "./provider";

const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Íris",
  //description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontInter.variable} antialiased flex flex-col gap-22`}
      >
        <AppProvider>
          <div className="w-full">
            <Header />
            <Navbar />
          </div>
          <main className="flex justify-center">
            <div className="w-full max-w-[1360px]">
              {children}
            </div>
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
