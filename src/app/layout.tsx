import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Realtime Sudoku",
  description: "Play Sudoku with your friends and complete all the stages.",
  creator: "Avik Mukherjee",
  keywords: ["sudoku", "realtime", "multiplayer"],
  abstract: "Play Sudoku with your friends and complete all the stages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-svh items-center justify-center`}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  );
}
