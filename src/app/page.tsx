import Image from "next/image";
import RestaurantBanner from "~/components/banner";
import RestaurantHours from "~/components/horaires";
import { SeparatorBanner } from "~/components/separator-banner";
import { TeamBanner } from "~/components/team-banner";
import { Separator } from "~/components/ui/separator";
import { IMAGE_VOLETS_ROUGES } from "~/lib/variables";

export default function HomePage() {
  return (
    <>
      <RestaurantBanner />

      <Separator />

      <section className="w-full py-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center">
          <RestaurantHours />
          <div className="flex flex-col items-center justify-center gap-8 lg:w-1/2">
            <p className="font-cormorant text-4xl text-accent md:text-6xl">
              Nous trouver
            </p>
            <div className="motion-preset-slide-left-sm flex flex-col items-center justify-center gap-4 text-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.4515287851873!2d1.4432470553566652!3d43.5971393817878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebd54c4c081c9%3A0xe1bda02993b3fe32!2sLes%20Volets%20Rouges!5e0!3m2!1sfr!2sau!4v1734833245436!5m2!1sfr!2sau"
                className="hidden rounded-2xl border border-accent lg:block"
                width="600"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.4515287851873!2d1.4432470553566652!3d43.5971393817878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebd54c4c081c9%3A0xe1bda02993b3fe32!2sLes%20Volets%20Rouges!5e0!3m2!1sfr!2sau!4v1734833245436!5m2!1sfr!2sau"
                width="400"
                height="300"
                className="block rounded-2xl border border-accent lg:hidden"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <Separator />
        <SeparatorBanner title="Les Volets Rouges" isMainTitle={false} />
        <Separator className="max-w-full lg:max-w-2xl" />
        <div className="flex flex-col items-center justify-center gap-6 py-4 lg:flex-row lg:items-start lg:justify-between lg:py-6 lg:text-left">
          <p className="max-w-full py-4 font-light md:max-w-md md:py-10 md:text-2xl">
            Une référence directe à notre terre natale,
            <strong className="text-accent"> le Pays Basque</strong>. Le
            Restaurant est situé au cœur du quartier des Carmes à Toulouse. Nous
            proposons une cuisine authentique et de saison, l&apos;idée est de
            travailler à partir de produits bruts sélectionnés avec soin, issus
            de l&apos;agriculture biologique et raisonnée, d&apos;élevage
            fermier et de pêche durable. Nous privilégions des vins naturels et
            biologiques.
          </p>
          <Image
            className="rounded-full lg:-mt-20"
            src={IMAGE_VOLETS_ROUGES}
            alt="photo de Vincent et Paul devant le restaurant les volets rouges"
            width={624}
            height={300}
          />
        </div>
        <Separator />
      </section>
      <section className="grid w-full items-center justify-center gap-6 py-16 lg:grid-cols-4">
        <Image
          className="motion-preset-bounce col-span-1 mr-10 h-[250px] w-[280px] rounded-full object-cover lg:-mt-10 lg:mr-0"
          src={
            "https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/photo_3.png"
          }
          alt="Paul qui cuisine"
          width={500}
          height={500}
        />
        <Image
          className="motion-preset-bounce col-span-1 ml-10 h-[250px] w-[280px] rounded-full object-cover lg:ml-0 lg:mt-10"
          src={
            "https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/photo_4.jpg?t=2024-11-12T01%3A18%3A08.838Z"
          }
          alt="Potimarron et citrouille"
          width={500}
          height={500}
        />
        <Image
          className="motion-preset-bounce col-span-1 mr-10 h-[360px] w-[280px] rounded-full object-cover lg:-mt-10 lg:mr-0"
          src={
            "https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/photo_5.jpg?t=2024-11-12T01%3A18%3A17.765Z"
          }
          alt="Vincent avec un tablier"
          width={500}
          height={500}
        />
        <Image
          className="motion-preset-bounce col-span-1 ml-10 h-[250px] w-[280px] rounded-full object-cover lg:ml-0 lg:mt-10"
          src={
            "https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/photo_6.jpg?t=2024-11-12T01%3A18%3A31.225Z"
          }
          alt="Bouteilles de vin"
          width={500}
          height={500}
        />
      </section>

      <section className="w-full">
        <TeamBanner />
      </section>
    </>
  );
}
