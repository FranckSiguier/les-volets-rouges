import { Suspense } from "react";
import {
  MenuDashboard,
  MenuSectionSkeleton,
} from "~/components/menu/menu-section";
import { Separator } from "~/components/ui/separator";

export default async function MenuPage() {
  return (
    <main className="flex w-full flex-col">
      <Separator className="mb-6 mt-16" />
      <p className="justify-left font-cormorant text-3xl">LE MENU</p>
      <Separator className="mb-12 mt-6" />
      <Suspense fallback={<MenuSectionSkeleton />}>
        <MenuDashboard />
      </Suspense>
    </main>
  );
}
