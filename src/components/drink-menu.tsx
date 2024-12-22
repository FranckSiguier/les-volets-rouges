import {
  Wine,
  Beer,
  Apple,
  CoffeeIcon as Cocktail,
  Coffee,
  CogIcon as GlassCog,
} from "lucide-react";
import React from "react";
import { DrinksType } from "~/app/actions";
import { Card, CardContent } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

// Map drink types to their display names and icons
const drinkTypeConfig: Record<
  DrinksType["type"],
  { label: string; icon: React.ComponentType }
> = {
  rouge: { label: "Vin Rouge", icon: Wine },
  blanc: { label: "Vin Blanc", icon: Wine },
  biere: { label: "Bière", icon: Beer },
  cidre: { label: "Cidre", icon: Apple },
  cocktail: { label: "Cocktails", icon: Cocktail },
  rose: { label: "Rosé", icon: Wine },
  soft: { label: "Sans alcool", icon: Coffee },
  champagne: { label: "Champagne", icon: GlassCog },
};

function DrinkCard({ drink }: { drink: DrinksType }) {
  const Icon = drinkTypeConfig[drink.type].icon;
  return (
    <Card className="overflow-hidden rounded-lg border border-accent">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon />
              <h3 className="font-medium">{drink.name}</h3>
            </div>
            {drink.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {drink.description}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="font-medium">{drink.price} €</div>
            {drink.glassPrice && (
              <div className="text-sm text-muted-foreground">
                Verre: {drink.glassPrice} €
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DrinksMenu({ drinks }: { drinks: DrinksType[] }) {
  // Group drinks by type
  const drinksByType = drinks.reduce(
    (acc, drink) => {
      if (!acc[drink.type]) {
        acc[drink.type] = [];
      }
      acc[drink.type]?.push(drink);
      return acc;
    },
    {} as Record<DrinksType["type"], DrinksType[]>,
  );

  // Get available drink types and sort them in a specific order
  const typeOrder: DrinksType["type"][] = [
    "champagne",
    "rouge",
    "blanc",
    "rose",
    "biere",
    "cidre",
    "cocktail",
    "soft",
  ];
  const availableTypes = typeOrder.filter(
    (type) => drinksByType[type]?.length > 0,
  );

  return (
    <div className="space-y-12">
      {availableTypes.map((type) => (
        <section key={type} className="scroll-m-20" id={type}>
          <div className="mb-6 flex items-center gap-2">
            <h2 className="font-cormorant text-2xl font-medium tracking-tight text-accent">
              {drinkTypeConfig[type].label}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {drinksByType[type].map((drink) => (
              <DrinkCard key={drink.id} drink={drink} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
