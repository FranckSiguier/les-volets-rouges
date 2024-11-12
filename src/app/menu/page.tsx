import { Suspense } from "react";
import {
  MenuDashboard,
  MenuSectionSkeleton,
} from "~/components/menu/menu-section";
import { Separator } from "~/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu - Les Volets Rouges",
  description: "Découvrez notre menu du midi et du soir.",
};

export default async function MenuPage() {
  return (
    <main className="mt-10 flex w-full flex-col">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 text-center">
          <p className="pb-2 font-cormorant text-4xl text-accent lg:mt-6">
            Le Midi
          </p>
          <p className="text-lg font-light">
            Plat du Jour <span className="text-accent">18€</span>
          </p>
          <p className="text-lg font-light">
            Plat du Jour + Dessert <span className="text-accent">24€</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <p className="pb-2 font-cormorant text-4xl text-accent lg:mt-6">
            Le Soir
          </p>
          <p className="text-lg font-light">
            Menu dégustation en 5 temps <span className="text-accent">75€</span>
          </p>
        </div>
      </div>
      <Separator className="mb-6 mt-10" />
      <p className="justify-left font-cormorant text-3xl">LA CARTE</p>
      <Separator className="mb-6 mt-6" />
      <Suspense fallback={<MenuSectionSkeleton />}>
        <MenuDashboard />
      </Suspense>
    </main>
  );
}
