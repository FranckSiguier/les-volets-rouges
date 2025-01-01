import { type DrinksType } from "~/app/actions";
import {
  DrinkRegion,
  Drinks,
  type DrinkType,
  DrinkTypeLabel,
} from "~/lib/types";

// Map drink types to their display names and icons

function DrinkCard({ drink }: { drink: DrinksType }) {
  const isThereRegionOrAppellation =
    (drink.region ?? drink.appellation) ? true : false;

  let colSpanName = "col-span-3";
  let colSpanPrice = "col-span-1";
  let gridCols = "grid-cols-7";
  if (!drink.year && !isThereRegionOrAppellation) {
    gridCols = "grid-cols-5";
    colSpanName = "col-span-3";
    colSpanPrice = "col-span-1";
  } else if (!isThereRegionOrAppellation && drink.year) {
    gridCols = "grid-cols-5";
    colSpanName = "col-span-2";
    colSpanPrice = "col-span-2";
  }

  return (
    <div className="flex flex-col gap-4 font-light">
      <div className={`grid ${gridCols} items-center justify-between`}>
        <div className={`${colSpanName} flex flex-col gap-1`}>
          <h3 className="font-mono text-sm md:text-lg">
            {drink.name.toUpperCase()}
          </h3>
          {drink.domaine && (
            <p className="text-xs font-extralight lg:text-sm">
              {drink.domaine.toUpperCase()}
            </p>
          )}
        </div>
        {drink.year ? (
          <p className="col-span-1 pr-2 text-right text-xs md:pr-4 lg:pr-6 lg:text-sm">
            {drink.year}
          </p>
        ) : (
          <div className="col-span-1"></div>
        )}
        {isThereRegionOrAppellation && (
          <div className="col-span-2 flex flex-col gap-2 pl-2 md:pl-4">
            {drink.region &&
              drink.type !== "blanc" &&
              drink.type !== "rouge" &&
              drink.type !== "rose" &&
              drink.isGlass && (
                <p className="font-mono text-xs md:text-sm lg:text-base">
                  {drink.region.toUpperCase()}
                </p>
              )}
            {drink.appellation && (
              <p className="text-xs font-extralight lg:text-sm">
                {drink.appellation.toUpperCase()}
              </p>
            )}
          </div>
        )}
        <p className={`${colSpanPrice} text-right font-mono text-xl`}>
          {drink.price}
        </p>
      </div>
    </div>
  );
}

export function WineSection({
  drinks,
  type,
}: {
  drinks: DrinksType[];
  type: DrinkType;
}) {
  const drinksByRegion = drinks.reduce(
    (acc, drink) => {
      if (drink.region && !acc[drink.region]) {
        acc[drink.region] = [];
      }
      if (drink.region) {
        acc[drink.region]?.push(drink);
      }
      return acc;
    },
    {} as Record<string, DrinksType[]>,
  );

  const availableRegions = DrinkRegion.filter(
    (region) => (drinksByRegion[region]?.length ?? 0) > 0,
  );

  return (
    <section key={type} className="md:px-40 lg:px-60" id={type}>
      <div className="flex flex-col items-center py-4 text-center font-cormorant md:py-8 lg:py-10">
        <h2 className="text-3xl font-medium text-accent">
          {DrinkTypeLabel[type].label.toUpperCase()}
        </h2>
        <p>
          {DrinkTypeLabel[type].volume !== "" && (
            <span className="text-2xl">{DrinkTypeLabel[type].volume}</span>
          )}
        </p>
      </div>
      {availableRegions.map((region) => (
        <div key={region} className="py-4">
          <h2 className="py-2 font-cormorant text-2xl text-accent">
            {region.toUpperCase()}
          </h2>
          <div className="flex flex-col gap-4 lg:gap-6">
            {drinksByRegion[region]?.map((drink) => (
              <DrinkCard key={drink.id} drink={drink} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function DrinksMenu({ drinks }: { drinks: DrinksType[] }) {
  const drinksByTheGlass = drinks.filter((drink) => drink.isGlass);
  const drinksByTheBottle = drinks.filter((drink) => !drink.isGlass);
  // Group drinks by type
  const drinksByType = drinksByTheBottle.reduce(
    (acc, drink) => {
      if (!acc[drink.type]) {
        acc[drink.type] = [];
      }
      acc[drink.type]?.push(drink);
      return acc;
    },
    {} as Record<DrinkType, DrinksType[]>,
  );

  const drinksByTheGlassByType = drinksByTheGlass.reduce(
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

  const availableTypesByTheGlass = Drinks.filter(
    (type) => drinksByTheGlassByType[type]?.length > 0,
  );

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {drinksByTheGlass.length > 0 && (
        <div className="flex flex-col items-center pb-6 text-center font-cormorant">
          <h2 className="text-3xl font-medium text-accent">VINS AU VERRE</h2>
        </div>
      )}
      {drinksByTheGlass.length > 0 &&
        availableTypesByTheGlass.map((type) => (
          <section
            key={type + "glass"}
            id={type + "glass"}
            className="md:px-40 lg:px-60"
          >
            <p className="py-2 font-cormorant text-xl text-accent md:text-2xl lg:py-4">
              {DrinkTypeLabel[type].label.toUpperCase()}
            </p>
            <div className="flex flex-col gap-4">
              {drinksByTheGlassByType[type].map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </section>
        ))}

      {availableTypes.map((type) =>
        type === "blanc" || type === "rouge" || type === "rose" ? (
          <WineSection key={type} drinks={drinksByType[type]} type={type} />
        ) : (
          <section key={type} className="md:px-40 lg:px-60" id={type}>
            <div className="flex flex-col items-center py-4 text-center font-cormorant md:py-8 lg:py-10">
              <h2 className="text-3xl font-medium text-accent">
                {DrinkTypeLabel[type].label.toUpperCase()}
              </h2>
              <p>
                {DrinkTypeLabel[type].volume !== "" && (
                  <span className="text-2xl">
                    {DrinkTypeLabel[type].volume}
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              {drinksByType[type].map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
            </div>
          </section>
        ),
      )}
    </div>
  );
}
