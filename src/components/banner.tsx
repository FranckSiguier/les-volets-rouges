"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Routes } from "~/utils/utils";

export default function RestaurantBanner() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Text Content */}
          <div className="relative z-10 mx-auto max-w-2xl font-cormorant lg:mx-0 lg:max-w-none">
            <div className="relative lg:pr-8">
              <p className="text-base font-medium uppercase tracking-wider text-primary">
                Bienvenue
              </p>
              <h1 className="mt-2 text-3xl font-medium tracking-tight text-accent md:text-5xl lg:text-6xl">
                Restaurant Bistronomique. <br />{" "}
                <span className="text-2xl md:text-4xl lg:text-5xl">
                  Au cœur des Carmes.
                </span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground md:text-2xl lg:text-2xl">
                Restaurant traditionnel situé à Toulouse, au cœur du quartier
                des Carmes. Venez déguster une cuisine française authentique et
                savoureuse dans un cadre chaleureux et convivial.
              </p>
              <div className="mt-8 flex flex-col gap-4 md:flex-row">
                <Link href={Routes.menu} prefetch>
                  <Button className="w-full" size="xl">
                    Voir le menu
                  </Button>
                </Link>
                <Link href={Routes.vins} prefetch>
                  <Button className="w-full" size="xl" variant="outline">
                    Carte des vins
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative mt-12 sm:mt-16 lg:mt-0">
            <div className="relative mx-auto max-w-2xl lg:max-w-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={
                    "https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/photo_1.jpg"
                  }
                  alt="photo de la rue Velane devant le restaurant les volets rouges"
                  className="h-full w-full rounded-2xl object-cover md:rounded-3xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fill
                  priority
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -left-8 -top-8 hidden w-72 rotate-[20deg] bg-primary/10 blur-3xl lg:block" />
              <div className="absolute -bottom-12 -right-8 hidden w-72 rotate-[-30deg] bg-primary/10 blur-3xl lg:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
