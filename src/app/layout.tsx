import type { Metadata, Viewport } from "next";
import { Inconsolata, Quantico } from "next/font/google";
import "./globals.css";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-quantico",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Kara Weaves — Prototype",
    template: "%s · Kara Weaves",
  },
  description: "Exploratory textile customization prototype for Kara Weaves.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inconsolata.variable} ${quantico.variable}`}>
      <body>{children}</body>
    </html>
  );
}
