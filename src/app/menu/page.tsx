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
        <div className="flex flex-col gap-2 text-center text-sm md:text-xl lg:text-2xl">
          <p className="pb-2 font-cormorant text-2xl text-accent md:text-3xl lg:mt-6 lg:pb-6 lg:text-4xl">
            DÉJEUNER
          </p>
          <p className="font-light md:text-2xl">
            PLAT DU JOUR : <span className="text-accent">18€</span>
          </p>
          <p className="font-light md:text-2xl">
            ENTREE / PLAT <span className="opacity-80">OU</span> PLAT / DESSERT
            : <span className="text-accent">24€</span>
          </p>
          <p className="font-light md:text-2xl">
            ENTREE / PLAT / DESSERT : <span className="text-accent">28€</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-center text-sm">
          <p className="pb-2 font-cormorant text-2xl text-accent lg:mt-6 lg:pb-6 lg:text-4xl">
            DÎNER
          </p>
          <p className="font-light md:text-xl lg:text-2xl">
            MENU DÉGUSTATION EN 5 TEMPS :{" "}
            <span className="text-accent">62€</span> / PERS
          </p>
          <p className="font-light opacity-80">
            Une expérience culinaire en 5 étapes, pensée pour être partagée par
            l&apos;ensemble de la table.
          </p>
          <p className="font-light md:text-xl lg:text-2xl">
            ACCORD METS & VINS : <span className="text-accent">35€</span> / PERS
          </p>
          <p className="font-extralight opacity-80">
            (Ainsi que notre carte habituelle)
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
