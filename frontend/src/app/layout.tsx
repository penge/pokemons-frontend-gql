import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers/Providers";
import Notifications from "@/components/Notifications/Notifications";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className={inter.className}>
        <Providers>
          <Notifications />
          {children}
        </Providers>
      </body>
    </html>
  );
}
