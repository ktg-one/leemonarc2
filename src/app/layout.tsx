import type { Metadata } from "next";
import { Newsreader, Manrope, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/chrome";
import { Cursor } from "@/components/cursor";
import "./refresh.css";

const newsreader = Newsreader({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Lee Monarc — Accounting & Advisory, Perth",
  description:
    "Accounting and commercially minded financial advisory with Vivienne Lee in Perth, Western Australia.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${newsreader.variable} ${manrope.variable} ${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body id="top">
        <Cursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
