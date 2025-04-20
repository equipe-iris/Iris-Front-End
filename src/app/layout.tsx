import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "./provider";
import { Toaster } from "sonner";

const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontInter.variable} antialiased`} suppressHydrationWarning
      >
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
