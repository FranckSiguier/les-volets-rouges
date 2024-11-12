import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vins - Les Volets Rouges",
  description: "Découvrez notre carte des vins.",
};

export default function VinsPage() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      La carte des vins arrive
    </div>
  );
}
