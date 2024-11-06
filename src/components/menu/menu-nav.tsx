"use client";
import { useState } from "react";
import { Separator } from "~/components/ui/separator";
import { MenuSection } from "./menu-section";
import { type getActiveMenu } from "~/app/actions";
import { type MenuSectionType } from "~/lib/types";

export default function MenuNav({
  menu,
}: {
  menu: Awaited<ReturnType<typeof getActiveMenu>>;
}) {
  const [menuSection, setMenuSection] = useState<MenuSectionType>("starter");

  return (
    <main className="flex w-full flex-col">
      <Separator className="mb-6 mt-16" />
      <p className="justify-left font-cormorant text-3xl">LE MENU</p>
      <Separator className="mb-12 mt-6" />
      <div className="align-center flex justify-center gap-8 text-center font-thin sm:text-sm">
        <button
          className={`text-sm md:text-xl ${menuSection === "starter" ? "text-accent underline underline-offset-[4px]" : ""}`}
          onClick={() => setMenuSection("starter")}
        >
          À Partager
        </button>
        <button
          className={`text-sm md:text-xl ${menuSection === "entree" ? "text-accent underline underline-offset-[4px]" : ""}`}
          onClick={() => setMenuSection("entree")}
        >
          Entrées
        </button>

        <button
          className={`text-sm md:text-xl ${menuSection === "main" ? "text-accent underline underline-offset-[4px]" : ""}`}
          onClick={() => setMenuSection("main")}
        >
          Plats
        </button>
        <button
          className={`text-sm md:text-xl ${menuSection === "dessert" ? "text-accent underline underline-offset-[4px]" : ""}`}
          onClick={() => setMenuSection("dessert")}
        >
          Desserts
        </button>
      </div>

      <MenuSection selectedSection={menuSection} menu={menu} />
    </main>
  );
}
