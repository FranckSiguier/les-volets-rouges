import { type Metadata } from "next";
import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { Toaster } from "~/components/ui/toaster";
import "~/styles/globals.css";
import { Oswald, Cormorant } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Accueil - Les Volets Rouges",
  description:
    "Restaurant Bistronomique Les Volets Rouges à Toulouse, dans le quartier des Carmes. Cuisine traditionnelle et produits locaux.",
  openGraph: {
    siteName: "Les Volets Rouges, Restaurant",
    type: "website",
    title: "Les Volets Rouges",
    description:
      "Restaurant Bistronomique Les Volets Rouges à Toulouse, dans le quartier des Carmes. Cuisine traditionnelle et produits locaux.",
    url: "https://www.lesvoletsrouges.fr/",
    images: [
      {
        url: "https://www.lesvoletsrouges.fr/logo-navbar.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Volets Rouges",
    description:
      "Restaurant Bistronomique Les Volets Rouges à Toulouse, dans le quartier des Carmes. Cuisine traditionnelle et produits locaux.",
    images: ["https://www.lesvoletsrouges.fr/logo-navbar.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
  },
  alternates: {
    canonical: "https://www.lesvoletsrouges.fr/",
  },
  icons: [{ rel: "icon", url: "/favicon-32x32.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <main
          className={`${cormorant.variable} ${oswald.variable} flex flex-col items-center bg-background px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32`}
        >
          <Navbar />
          {children}
          {/* <Marquee /> */}
          <Footer />
          <Toaster />
        </main>
      </body>
    </html>
  );
}
