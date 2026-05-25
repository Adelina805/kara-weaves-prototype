import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
});

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
    <html lang="en" className={inconsolata.variable}>
      <body>{children}</body>
    </html>
  );
}
