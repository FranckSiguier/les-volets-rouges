import Image from "next/image";
import { Separator } from "./ui/separator";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="mt-6 flex w-full flex-col items-center justify-center gap-6 pb-10 pt-4">
      <Separator />
      <div className="flex w-full flex-col items-center justify-between gap-6 p-6 lg:flex-row">
        <Image
          src={"/logo-horizontal.png"}
          alt="logo restaurant"
          width={200}
          className="sm:h-1/2 sm:w-auto md:h-1/3 md:w-auto lg:h-1/4 lg:w-auto"
          height={200}
        />
        <div className="flex flex-col items-center gap-4 text-center lg:w-1/6">
          <p className="font-cormorant text-xl">Contact</p>
          <a href="mailto:restaurant.volets.rouges@gmail.com">
            <span className="overflow-hidden text-sm underline underline-offset-1 opacity-75">
              restaurant.volets.rouges@gmail.com
            </span>
          </a>
          <p className="text-sm underline underline-offset-1 opacity-75">
            +33 6 58 01 45 49
          </p>
          <div className="flex items-center opacity-75">
            <p className="text-light hidden pr-2 md:block">Suivez nous sur</p>
            <a
              target="_blank"
              href="https://www.instagram.com/lesvoletsrouges_restaurant/"
            >
              <InstagramLogoIcon />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 text-center lg:w-1/6">
          <p className="font-cormorant text-xl">Lieu</p>
          <p className="text-sm opacity-75">📍 Quartier des Carmes</p>
        </div>
        <div className="flex flex-col items-center gap-4 text-center lg:w-1/6">
          <p className="font-cormorant text-xl">Horaires</p>
          <p className="text-sm opacity-75">Mercredi - Vendredi | 12h - 14h </p>
          <p className="text-sm opacity-75">Mardi - Samedi | 19h30 - 22h30</p>
        </div>
      </div>
      <Separator />
    </footer>
  );
}
