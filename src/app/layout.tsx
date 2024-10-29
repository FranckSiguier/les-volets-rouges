import "~/styles/globals.css";
import { type Metadata } from "next";
import { Navbar } from "~/components/navbar";

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
        <main className="flex flex-col items-center bg-background xl:px-24 2xl:px-32">
          <Navbar />
          {children}
          {/* Marquee */}
          {/* Footer */}
        </main>
      </body>
    </html>
  );
}
