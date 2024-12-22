import type { Metadata } from "next";
import { DrinksMenu } from "~/components/drink-menu";
import { getDrinks } from "../actions";
import { Separator } from "~/components/ui/separator";
import { SeparatorBanner } from "~/components/separator-banner";

export const metadata: Metadata = {
  title: "Vins - Les Volets Rouges",
  description: "Découvrez notre carte des vins.",
};

export default async function VinsPage() {
  const drinks = await getDrinks();

  return (
    <main className="min-h-screen w-full bg-background">
      <div className="py-8">
        <Separator />
        <SeparatorBanner isMainTitle title="Notre Sélection" />
        <Separator />
        <section className="py-8">
          <DrinksMenu drinks={drinks} />
        </section>
      </div>
    </main>
  );
}
