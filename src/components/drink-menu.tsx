import { type DrinksType } from "~/app/actions";
import { Drinks, type DrinkType, DrinkTypeLabel } from "~/lib/types";

// Map drink types to their display names and icons

function DrinkCard({ drink }: { drink: DrinksType }) {
  return (
    <div className="flex flex-col gap-4 font-light">
      <div className="grid grid-cols-6 items-center justify-between">
        <div className="col-span-2 flex flex-col gap-1">
          <h3 className="text-base md:text-xl">{drink.name.toUpperCase()}</h3>
          {drink.domaine && (
            <p className="text-xs font-extralight md:text-sm">
              {drink.domaine.toUpperCase()}
            </p>
          )}
        </div>
        {drink.year ? (
          <p className="col-span-1 pr-2 text-right md:pr-4 lg:pr-6">
            {drink.year}
          </p>
        ) : (
          <p className="col-span-1 text-right"></p>
        )}
        <div className="col-span-2 flex flex-col gap-2 pl-2 md:pl-4">
          {drink.region && (
            <p className="text-sm md:text-base lg:text-xl">
              {drink.region.toUpperCase()}
            </p>
          )}
          {drink.appellation && (
            <p className="text-xs font-extralight md:text-sm lg:text-base">
              {drink.appellation.toUpperCase()}
            </p>
          )}
        </div>
        <p className="col-span-1 text-right text-xl">{drink.price}</p>
      </div>
    </div>
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
    {} as Record<DrinkType, DrinksType[]>,
  );

  const availableTypes = Drinks.filter(
    (type) => drinksByType[type]?.length > 0,
  );

  return (
    <div className="space-y-12">
      {availableTypes.map((type) => (
        <section key={type} className="md:px-40 lg:px-60" id={type}>
          <div className="flex flex-col items-center pb-6 text-center font-cormorant md:pb-10 lg:pb-16">
            <h2 className="text-3xl font-medium text-accent">
              {DrinkTypeLabel[type].label.toUpperCase()}
            </h2>
            <p>
              {DrinkTypeLabel[type].volume !== "" && (
                <span className="text-2xl">{DrinkTypeLabel[type].volume}</span>
              )}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {drinksByType[type].map((drink) => (
              <DrinkCard key={drink.id} drink={drink} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
