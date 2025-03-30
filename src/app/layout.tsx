import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "./provider";
import ContentLayout from "@/components/layouts/content-layout";

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
        className={`${fontInter.variable} antialiased flex flex-col gap-22`}
      >
        <AppProvider>
          <ContentLayout>
            {children}
          </ContentLayout>
        </AppProvider>
      </body>
    </html>
  );
}
