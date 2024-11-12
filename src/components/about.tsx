import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

export function About() {
  return (
    <>
      <section className="mt-6 flex flex-col md:flex-row md:gap-20">
        <div className="motion-preset-slide-right-sm flex flex-col justify-center gap-4 py-6 text-center">
          <p className="font-cormorant text-3xl text-accent">Nos horaires</p>
          <p className="text-sm opacity-75">Mercredi - Vendredi | 12h - 14h </p>
          <p className="text-sm opacity-75">Mardi - Samedi | 19h30 - 22h30</p>
        </div>
        <div className="motion-preset-slide-left-sm flex flex-col justify-center gap-4 py-6 text-center">
          <p className="font-cormorant text-3xl text-accent">Nous trouver</p>
          <p className="text-sm opacity-75">1 Rue Vélane</p>
          <p className="text-sm opacity-75">31000 Toulouse, France</p>
        </div>
      </section>
      <section className="relative my-10 h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          <div className="relative z-10 flex flex-col items-start justify-center p-8 font-cormorant md:col-span-2">
            <h1 className="mb-8 text-5xl text-accent md:text-7xl lg:text-8xl">
              Restaurant.
            </h1>
            <h2 className="motion-preset-typewriter-[18] font-cormorant text-4xl text-accent motion-duration-2000 motion-reduce:animate-none md:text-6xl lg:text-7xl">
              Au coeur des Carmes.
            </h2>
          </div>
          <div className="md:col-span-1" />
        </div>
        <div className="absolute inset-0 md:left-[25%]">
          <Image
            src={
              "https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/photo_1.jpg"
            }
            alt="Rue de Toulouse"
            className="h-full w-full rounded-3xl object-cover md:rounded-full"
            fill
            priority
          />
          <div className="absolute inset-0 w-full rounded-3xl bg-black opacity-20 md:rounded-full" />
        </div>
      </section>
      <section className="w-full">
        <Separator />
        <h1 className="py-4 font-cormorant text-2xl font-thin md:text-4xl lg:text-6xl">
          Notre histoire
        </h1>
        <Separator className="max-w-full lg:max-w-2xl" />
        <div className="flex flex-col items-center justify-center gap-6 py-4 text-center lg:flex-row lg:items-start lg:justify-between lg:py-6 lg:text-left">
          <p className="max-w-full py-4 text-xl font-light md:max-w-md md:py-10">
            <strong className="text-accent">Les volets rouges</strong>{" "}
            c&apos;est un clin d&apos;œil à notre région d&apos;origine, le Pays
            basque. Le Restaurant est situé au cœur du quartier des Carmes à
            Toulouse. Nous proposons une cuisine authentique et de saison,
            l&apos;idée est de travailler à partir de produits bruts
            sélectionnés avec soin, issus de l&apos;agriculture biologique et
            raisonnée, d&apos;élevage fermier et de pêche durable. Nous
            privilégions des vins naturels et biologiques.
          </p>
          <Image
            className="rounded-full lg:-mt-20"
            src={
              "https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/photo_2.jpg?t=2024-11-12T01%3A15%3A49.464Z"
            }
            alt="L'équipe du restaurant Les Volets Rouges"
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
      <Separator />
      <div className="container mx-auto py-10 text-sm font-light">
        <h1 className="mb-10 text-center text-4xl text-[#2c2c2c]">
          L&apos;équipe
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border border-accent shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/Chef%20Icon.png?t=2024-11-12T02%3A28%3A26.440Z"
                    alt="Paul Du Bois De Maquillé"
                  />
                  <AvatarFallback>Paul</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-light">Paul</CardTitle>
                  <CardDescription className="font-cormorant text-lg font-semibold text-accent">
                    Chef de cuisine
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Après avoir travaillé à Paris pendant plus de dix ans, et
                s&apos;être formé dans de nombreux établissements dont{" "}
                <strong>Le Rech </strong>(Alain Ducasse),{" "}
                <strong>Restaurant Papillon </strong>(Christophe Saint Agne),{" "}
                <strong>Restaurant Septime </strong>(Bertrand Grebault et Théo
                Pourriat) et <strong>Restaurant Le Servan </strong>(Tatiana et
                Katia Levha), Paul retourne à Toulouse, où il a grandi, et ouvre
                son propre restaurant.
              </p>
              <p>
                Aujourd&apos;hui, ses multiples expériences se mêlent à ses
                origines et à sa technique pour réaliser des plats créatifs, en
                adéquation avec sa représentation de la cuisine durable,
                inventive et au service du goût.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-accent shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="https://njowvzjporohgzvgfyif.supabase.co/storage/v1/object/public/assets/Waiter%20Icon.png?t=2024-11-12T02%3A30%3A33.568Z"
                    alt="Vincent Du Bois De Maquillé"
                  />
                  <AvatarFallback>Vincent</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-light">Vincent</CardTitle>
                  <CardDescription className="font-cormorant text-lg font-semibold text-accent">
                    Directeur de salle
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Après une formation initiale dans le domaine de la finance à
                l&apos;Université de Lyon, Vincent travaille dans le milieu de
                l&apos;audit financier, chez Forvis Mazars à Lyon puis à
                Toulouse.
              </p>
              <p>
                Après plusieurs années d&apos;exercice, il décide de se joindre
                à son frère Paul dans l&apos;ouverture de son restaurant, et se
                forme alors au service en salle et à la sommellerie à Paris (Le
                Servan).
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
