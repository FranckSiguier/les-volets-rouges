import type { Metadata } from "next";
import { Suspense } from "react";
import {
  MenuDashboard,
  MenuSectionSkeleton,
} from "~/components/menu/menu-section";
import { SeparatorBanner } from "~/components/separator-banner";
import { Separator } from "~/components/ui/separator";
import { getMenuOfTheDay } from "../actions";

export const metadata: Metadata = {
  title: "Menu - Les Volets Rouges",
  description: "Découvrez notre menu du midi et du soir.",
};

export default async function MenuPage() {
  // Sample data for menu of the day - will be replaced with DB data later
  const menuOfTheDay = await getMenuOfTheDay();

  return (
    <main className="flex w-full flex-col">
      {/* Menu of the Day Section */}
      <div className="mb-2 flex flex-col items-center gap-8 px-4 py-4 md:py-6">
        <h2 className="font-cormorant text-2xl text-accent md:text-4xl lg:text-5xl">
          Menu du jour (
          {new Date(menuOfTheDay?.date ?? new Date()).toLocaleDateString(
            "fr-FR",
            {
              dateStyle: "full",
            },
          )}
          )
        </h2>
        <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {/* Entrée du Jour */}
          <div className="rounded-lg border border-accent/20 bg-background/50 p-6 shadow-sm md:p-8">
            <div className="mb-4 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-cormorant text-xl text-accent md:text-2xl lg:text-3xl">
                  {menuOfTheDay?.starter}
                </h4>
                <p className="whitespace-nowrap text-lg font-light md:text-xl">
                  {menuOfTheDay?.starterPrice}€
                </p>
              </div>
              <p className="text-base font-light leading-relaxed text-foreground/80 md:text-lg">
                {menuOfTheDay?.starterDescription}
              </p>
            </div>
          </div>

          {/* Plat du Jour */}
          <div className="rounded-lg border border-accent/20 bg-background/50 p-6 shadow-sm md:p-8">
            <div className="mb-4 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-cormorant text-xl text-accent md:text-2xl lg:text-3xl">
                  {menuOfTheDay?.main}
                </h4>
                <p className="whitespace-nowrap text-lg font-light md:text-xl">
                  {menuOfTheDay?.mainPrice}€
                </p>
              </div>
              <p className="text-base font-light leading-relaxed text-foreground/80 md:text-lg">
                {menuOfTheDay?.mainDescription}
              </p>
            </div>
          </div>

          {/* Dessert du Jour */}
          <div className="rounded-lg border border-accent/20 bg-background/50 p-6 shadow-sm md:p-8">
            <div className="mb-4 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-cormorant text-xl text-accent md:text-2xl lg:text-3xl">
                  {menuOfTheDay?.dessert}
                </h4>
                <p className="whitespace-nowrap text-lg font-light md:text-xl">
                  {menuOfTheDay?.dessertPrice}€
                </p>
              </div>
              <p className="text-base font-light leading-relaxed text-foreground/80 md:text-lg">
                {menuOfTheDay?.dessertDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

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
