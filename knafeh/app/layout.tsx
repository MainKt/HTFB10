import type { Metadata } from "next";
import ThirdwebWrapper from "@/components/thirdweb-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knafeh",
  description: "A dessert for your social life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebWrapper>
          <header className="container">
            <NavBar />
          </header>
          <main className="container">
            <div className="flex flex-col w-full max-w-md pb-12 mx-auto stretch">
              {children}
            </div>
          </main>
        </ThirdwebWrapper>
      </body>
    </html>
  );
}
