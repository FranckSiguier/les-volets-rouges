import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VOLETS_EMAIL } from "~/lib/variables";
import { Separator } from "./ui/separator";
import { Routes } from "~/utils/utils";

export function Footer() {
  return (
    <footer className="mt-6 flex w-full flex-col items-center justify-center gap-6 pb-10 pt-4 font-mono text-2xl">
      <Separator />
      <div className="flex w-full flex-col items-center justify-between gap-6 p-6 lg:flex-row">
        <Image
          src={"/logo-footer.png"}
          alt="logo restaurant"
          width={200}
          className="sm:h-1/2 sm:w-auto md:h-1/3 md:w-auto lg:h-1/4 lg:w-auto"
          height={200}
        />
        <div className="flex flex-col items-center gap-4 text-center lg:w-1/6">
          <p className="font-cormorant font-bold text-accent">Contact</p>
          <Link href={`mailto:${VOLETS_EMAIL}`}>
            <span className="overflow-hidden text-lg underline underline-offset-1 opacity-75">
              {VOLETS_EMAIL}
            </span>
          </Link>
          <p className="text-lg underline underline-offset-1 opacity-75">
            05 34 35 86 30
          </p>
          <div className="flex items-center gap-1 opacity-75">
            <Link
              target="_blank"
              href="https://www.instagram.com/lesvoletsrouges_restaurant/"
            >
              <InstagramLogoIcon
                height={24}
                width={24}
                className="text-accent"
              />
            </Link>
            <Link
              target="_blank"
              href="https://www.facebook.com/lesvoletsrouges31"
            >
              <FacebookIcon height={24} width={24} className="text-primary" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 text-center lg:w-1/6">
          <p className="font-cormorant font-bold text-accent">Lieu</p>
          <p className="text-lg opacity-75">1 Rue Vélane</p>
          <p className="text-lg opacity-75">31000 Toulouse, France</p>
        </div>
        <div className="flex flex-col items-center gap-4 text-center lg:w-1/6">
          <p className="font-cormorant text-2xl font-bold text-accent">
            Horaires
          </p>
          <p className="text-lg opacity-75">
            Mercredi - Vendredi <br /> 12h15 - 14h{" "}
          </p>
          <p className="text-lg opacity-75">
            Mardi - Samedi <br /> 19h30 - 21h30
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex w-full justify-center gap-4 py-2 text-primary sm:px-4">
        <p className="text-center text-lg font-light">
          © 2024 Les Volets Rouges. Tous droits réservés. -{" "}
          <Link href={Routes.mentionsLegales} className="underline">
            Mentions légales
          </Link>
        </p>
      </div>
    </footer>
  );
}
