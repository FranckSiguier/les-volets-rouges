import Image from "next/image";
import { Separator } from "./ui/separator";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { VOLETS_EMAIL } from "~/lib/variables";
import { FacebookIcon } from "lucide-react";
import { horaires } from "~/lib/types";

export function Footer() {
  return (
    <footer className="mt-6 flex w-full flex-col items-center justify-center gap-6 pb-10 pt-4 text-2xl">
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
            +33 6 58 01 45 49
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
          <p className="font-cormorant font-bold text-accent">Horaires</p>
          <p className="text-lg opacity-75">{horaires[0]}</p>
          <p className="text-lg opacity-75">{horaires[1]}</p>
        </div>
      </div>
      <Separator />
      <div className="flex w-full justify-center gap-4 py-2 text-primary sm:px-4">
        <p className="text-center text-lg font-light">
          © 2024 Les Volets Rouges. Tous droits réservés. -{" "}
          <Link href="/mentions-legales" className="underline">
            Mentions légales
          </Link>
        </p>
      </div>
    </footer>
  );
}
