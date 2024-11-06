import "~/styles/globals.css";
import { type Metadata } from "next";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import Marquee from "~/components/marquee";
import { Separator } from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Les Volets Rouges",
  description: "Site web du restaurant Les Volets Rouges à Toulouse",
  icons: [{ rel: "icon", url: "/favicon-32x32.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <main className="flex flex-col items-center bg-background px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <Navbar />
          {children}
          <Marquee />
          <Footer />
        </main>
      </body>
    </html>
  );
}
