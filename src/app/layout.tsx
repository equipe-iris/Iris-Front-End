import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "./provider";
import ContentLayout from "@/components/layouts/content-layout";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontInter.variable} antialiased flex flex-col gap-22`}
      >
        <AppProvider>
          <ContentLayout>
            {children}
          </ContentLayout>
          <Toaster/>
        </AppProvider>
      </body>
    </html>
  );
}
