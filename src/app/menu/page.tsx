import type { Metadata } from "next";
import { Suspense } from "react";
import {
  MenuDashboard,
  MenuSectionSkeleton,
} from "~/components/menu/menu-section";
import { SeparatorBanner } from "~/components/separator-banner";
import { Separator } from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Menu - Les Volets Rouges",
  description: "Découvrez notre menu du midi et du soir.",
};

export default async function MenuPage() {
  return (
    <main className="flex w-full flex-col">
      <div className="mb-5 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-40 md:py-5 lg:py-10">
        <div className="flex flex-col gap-2 text-center">
          <p className="pb-2 font-cormorant text-4xl text-accent lg:mt-6 lg:pb-6 lg:text-6xl">
            Le Midi
          </p>
          <p className="text-lg font-light md:text-2xl">
            Plat du Jour <span className="text-accent">18€</span>
          </p>
          <p className="text-lg font-light md:text-2xl">
            Plat du Jour + Dessert <span className="text-accent">24€</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <p className="pb-2 font-cormorant text-4xl text-accent lg:mt-6 lg:pb-6 lg:text-6xl">
            Le Soir
          </p>
          <p className="text-lg font-light md:text-2xl">
            Menu dégustation en 5 temps <span className="text-accent">58€</span>
          </p>
          <p className="text-lg font-extralight md:text-2xl">
            (Ainsi que la carte ci-dessous)
          </p>
        </div>
      </div>

      <Separator />
      <SeparatorBanner title="LA CARTE" isMainTitle />
      <Separator />
      <Suspense fallback={<MenuSectionSkeleton />}>
        <MenuDashboard />
      </Suspense>
    </main>
  );
}
