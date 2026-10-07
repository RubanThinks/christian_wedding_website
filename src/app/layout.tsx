import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Alex_Brush, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/config/wedding";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#140E0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://elizabethanddaniel.com"),
  title: `${weddingData.couple.bride.name} & ${weddingData.couple.groom.name} — Wedding Invitation`,
  description: `Celebrate the holy covenant of marriage between ${weddingData.couple.bride.name} and ${weddingData.couple.groom.name} on ${weddingData.wedding.date}.`,
  openGraph: {
    title: `${weddingData.couple.bride.name} & ${weddingData.couple.groom.name} — Holy Matrimony`,
    description: `We invite you to celebrate the beginning of our life together under the blessing of God.`,
    images: [
      {
        url: weddingData.media.churchBg,
        width: 1200,
        height: 675,
        alt: "Church Sanctuary at Golden Hour",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${alexBrush.variable} ${montserrat.variable} ${poppins.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[#FCFAF6] text-[#211B17] antialiased selection:bg-[#C59A45]/20 selection:text-[#211B17]">
        {children}
      </body>
    </html>
  );
}
