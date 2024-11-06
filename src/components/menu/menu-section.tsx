import { type getActiveMenu } from "~/app/actions";
import { type MenuItemType } from "~/server/db/schema";

export function MenuSection({
  menu,
  selectedSection,
}: {
  menu: Awaited<ReturnType<typeof getActiveMenu>>;
  selectedSection: MenuItemType["type"];
}) {
  const title =
    selectedSection === "entree"
      ? "Entrées"
      : selectedSection === "main"
        ? "Plats"
        : selectedSection === "dessert"
          ? "Desserts"
          : "À Partager";

  return (
    <div className="flex flex-col py-12 sm:px-4 lg:px-32">
      <div className="flex flex-col gap-12">
        <p className="text-center font-cormorant text-3xl text-accent">
          {title}
        </p>
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {menu?.menuItems.map(
            (item) =>
              item.type === selectedSection && (
                <MenuItem key={item.id} item={item} />
              ),
          )}
        </div>
      </div>
    </div>
  );
}

function MenuItem({ item }: { item: MenuItemType }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="font-cormorant text-2xl">{item.name?.toUpperCase()}</p>
        <p className="text-lg font-light text-accent">{item.price}€</p>
      </div>
      <p className="pr-6 text-lg font-light">{item.description}</p>
    </div>
  );
}
