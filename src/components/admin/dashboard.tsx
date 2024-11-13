"use client";

import { LoaderCircle, XIcon } from "lucide-react";
import { useState } from "react";
import { deleteItem, type MenuType, type getMenus } from "~/app/actions";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { toast } from "~/hooks/use-toast";
import CreateItem from "./components/create-item";
import ModifyItem from "./components/modify-item";

export default function RestaurantDashboard({
  menus,
}: {
  menus: Awaited<ReturnType<typeof getMenus>>;
}) {
  const [isDeleting, setIsDeleting] = useState(0);

  const [activeMenu, setActiveMenu] = useState<MenuType>(
    menus.find((menu) => menu.active) ?? menus[0],
  );
  const handleDeleteClick = async (id: number) => {
    setIsDeleting(id);
    const isDeleted = await deleteItem(id);
    if (isDeleted) {
      toast({
        title: "Plat supprimé",
        description: "Le plat a été supprimé avec succès",
      });
      if (!activeMenu) {
        return;
      }

      setActiveMenu({
        ...activeMenu,
        menuItems: activeMenu.menuItems.filter((item) => item.id !== id),
      });
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du plat",
      });
    }
    setIsDeleting(0);
  };

  return (
    <div className="flex w-full flex-col items-center bg-background p-4 md:rounded-l-3xl">
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <div className="w-full rounded-t-sm border border-b-0 border-accent bg-white p-6 md:w-1/3 md:rounded-l-3xl md:rounded-r-none md:border-b md:border-r-0">
          <div className="flex justify-between">
            <h2 className="mb-4 text-2xl font-light">Menus</h2>
            <CreateItem activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          </div>

          {menus.map((menu) => (
            <div key={menu.id} className="mb-2 flex items-center space-x-2">
              <Checkbox
                id={`menu-${menu.id}`}
                checked={activeMenu?.id === menu.id}
                onCheckedChange={() => setActiveMenu(menu)}
              />
              <label
                htmlFor={`menu-${menu.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {menu.name}
              </label>
            </div>
          ))}
        </div>
        <div className="grid w-full bg-primary p-4 md:min-h-screen md:w-2/3 md:rounded-r-3xl">
          <h2 className="mb-4 py-2 text-center text-2xl font-light text-white">
            Plats
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {activeMenu?.menuItems.map((item) => (
              <Card
                key={item.id}
                className="relative flex flex-col items-start space-y-2 bg-background"
              >
                <CardHeader>
                  <p className="w-2/3 font-light text-accent">{item.name}</p>
                  {isDeleting === item.id ? (
                    <LoaderCircle className="absolute right-4 top-4 animate-spin cursor-not-allowed text-accent" />
                  ) : (
                    <XIcon
                      className="absolute right-4 top-4 cursor-pointer hover:text-accent"
                      onClick={() => handleDeleteClick(item.id)}
                    />
                  )}
                  <ModifyItem
                    item={{ ...item, description: item.description ?? "" }}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                </CardHeader>
                <CardContent className="flex w-4/5 justify-between text-sm font-thin">
                  <p>{item.description}</p>
                  <p className="text-accent">{item.price}€</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
