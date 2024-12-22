import { getActiveMenu } from "~/app/actions";
import { MenuSectionType } from "~/lib/types";
import { type MenuItemType } from "~/server/db/schema";
import { Skeleton } from "../ui/skeleton";

export async function MenuDashboard() {
  const menu = await getActiveMenu();

  return MenuSectionType.map((section, index) => (
    <MenuSection key={index} selectedSection={section} menu={menu} />
  ));
}

export async function MenuSection({
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
          : "Pour commencer";

  return (
    <div className="flex flex-col py-8 sm:px-4 lg:px-32">
      <div className="flex flex-col gap-12">
        <p className="text-center font-cormorant text-5xl text-accent">
          {title}
        </p>
        <div className="grid grid-cols-1 gap-16 px-10 sm:grid-cols-2 md:grid-cols-2 md:px-0 lg:grid-cols-3">
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

function MenuItem({
  item,
}: {
  item: Omit<MenuItemType, "createdAt" | "updatedAt" | "menuId">;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="font-cormorant text-2xl lg:pr-2">
          {item.name?.toUpperCase()}
        </p>
        <p className="text-lg font-light text-accent">{item.price}€</p>
      </div>
      <p className="pr-6 text-lg font-light">{item.description}</p>
    </div>
  );
}

export function MenuSectionSkeleton() {
  return (
    <div className="flex flex-col py-12 sm:px-4 lg:px-32">
      <div className="flex flex-col gap-12">
        <Skeleton className="h-8 w-24" />
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((_, index) => (
            <MenuItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuItemSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
