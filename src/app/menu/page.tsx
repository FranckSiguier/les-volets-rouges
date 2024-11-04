"use client";
import { useState } from "react";
import { Separator } from "~/components/ui/separator";

type MenuSection = "entree" | "plat" | "dessert";

export default function MenuPage() {
  const [menuSection, setMenuSection] = useState<MenuSection>("entree");
  return (
    <main className="flex w-full flex-col">
      <Separator className="mb-6 mt-16" />
      <p className="justify-left font-cormorant text-3xl">LE MENU</p>
      <Separator className="mb-12 mt-6" />
      <div className="align-center flex justify-center gap-8 text-center font-thin">
        <button
          className={`text-xl ${menuSection === "entree" ? "text-accent underline underline-offset-[4px]" : ""}`}
          onClick={() => setMenuSection("entree")}
        >
          Entrées
        </button>

        <button
          className={`text-xl ${menuSection === "plat" ? "text-accent underline underline-offset-[4px]" : ""}`}
          onClick={() => setMenuSection("plat")}
        >
          Plats
        </button>
        <button
          className={`text-xl ${menuSection === "dessert" ? "text-accent underline underline-offset-[4px]" : ""}`}
          onClick={() => setMenuSection("dessert")}
        >
          Desserts
        </button>
      </div>

      <MenuSection menuSection={menuSection} />
    </main>
  );
}

function MenuSection({ menuSection }: { menuSection: MenuSection }) {
  const title =
    menuSection === "entree"
      ? "Entrées"
      : menuSection === "plat"
        ? "Plats"
        : "Desserts";

  return (
    <div className="flex flex-col pt-12">
      <div className="flex flex-col gap-12">
        <p className="text-center font-cormorant text-3xl text-accent">
          {title}
        </p>
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </div>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="font-cormorant text-2xl">ESCARGOTS</p>
        <p className="text-lg font-light text-accent">10€</p>
      </div>
      <p className="pr-6 text-lg font-light">Escargot, Beurre, Persil</p>
    </div>
  );
}
