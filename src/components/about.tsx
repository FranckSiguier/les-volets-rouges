import Image from "next/image";
import { Separator } from "./ui/separator";
import { Video } from "./video";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function About() {
  return (
    <>
      <section className="relative mb-10 mt-10 h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          <div className="relative z-10 flex flex-col items-start justify-center p-8 font-cormorant md:col-span-2">
            <h1 className="mb-8 text-4xl text-accent md:text-5xl lg:text-8xl">
              Restaurant.
            </h1>
            <h2 className="text-3xl text-accent md:text-4xl lg:text-7xl">
              Au coeur des Carmes.
            </h2>
          </div>
          <div className="md:col-span-1" />
        </div>
        <div className="absolute inset-0 md:left-[25%]">
          <Video />
          <div className="absolute inset-0 w-full rounded-3xl bg-black opacity-30 md:rounded-full" />
        </div>
      </section>
      <section className="w-full">
        <Separator />
        <h1 className="py-4 font-cormorant text-2xl font-thin text-accent md:text-4xl lg:text-6xl">
          Notre histoire
        </h1>
        <Separator className="max-w-full lg:max-w-2xl" />
        <div className="flex flex-col items-center justify-center gap-6 py-4 text-center lg:flex-row lg:justify-between lg:py-6 lg:text-left">
          <p className="max-w-full py-4 text-xl font-light md:max-w-md md:py-10">
            Les Volets Rouges c&apos;est un clin d&apos;œil a notre région
            d&apos;origine, le pays basque bien sur. L&apos;idée est de
            travailler à partir de produits bruts que nous sélectionnons avec
            soins, d&apos;Occitanie, du pays basque et un peu d&apos;ailleurs.
            Ils sont issus de l&apos;agriculture biologique et raisonnée,
            d&apos;élevage fermier et de pêche durable. Nos vins sont biologique
            et/ou naturelles pour la majorité.
          </p>
          <Image
            className="rounded-full lg:-mt-20"
            src={"/cook-restaurant.jpg"}
            alt="Chef cuisine"
            width={624}
            height={300}
          />
        </div>
        <Separator />
      </section>
      <section className="grid w-full items-center justify-center gap-6 py-6 lg:grid-cols-4">
        <Image
          className="col-span-1 mr-10 rounded-full lg:-mt-10 lg:mr-0"
          src={"/plat1.jpg"}
          alt="Plat français"
          width={250}
          height={200}
        />
        <Image
          className="col-span-1 ml-10 rounded-full lg:ml-0 lg:mt-10"
          src={"/plat2.jpg"}
          alt="Plat français"
          width={250}
          height={200}
        />
        <Image
          className="col-span-1 mr-10 rounded-full lg:-mt-10 lg:mr-0"
          src={"/plat3.jpg"}
          alt="Plat français"
          width={250}
          height={200}
        />
        <Image
          className="col-span-1 ml-10 rounded-full lg:ml-0 lg:mt-10"
          src={"/plat4.jpg"}
          alt="Plat français"
          width={250}
          height={200}
        />
      </section>
      <Separator />
      <div className="container mx-auto py-10 text-sm font-light">
        <h1 className="mb-10 text-center text-4xl text-[#2c2c2c]">
          L&apos;équipe Les Volets Rouges
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-background shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="Paul Du Bois De Maquillé"
                  />
                  <AvatarFallback>Paul</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-light">Le Chef</CardTitle>
                  <CardDescription className="font-cormorant text-lg font-semibold text-accent">
                    Paul Du Bois De Maquillé
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Après plus de 10 ans de métier à Paris où il se forme dans de
                nombreux restaurants :
              </p>
              <ul className="mb-4 list-inside list-disc space-y-1">
                <li>
                  <strong>Le Rech</strong> d&apos;Alain Ducasse
                </li>
                <li>
                  <strong>Restaurant Papillon</strong> de Christophe Saint Agne
                </li>
                <li>
                  <strong>Restaurant Septime</strong> de Bertrand Grebault et
                  Théo Pourriat
                </li>
                <li>
                  <strong>Restaurant Le Servan</strong> De Tatiana et Katia
                  Levha
                </li>
              </ul>
              <p className="mb-4">
                Aujourd&apos;hui, ses multiples expériences culinaires se mêlent
                à ses origines et sa technique pour réaliser des plats créatifs,
                en adéquation avec sa représentation de la cuisine axée sur un
                sourcing propre et une grande créativité au service du goût.
              </p>
              <p>
                Paul réalise son rêve et ouvre son restaurant dans la ville où
                il a grandi.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="Vincent Du Bois De Maquillé"
                  />
                  <AvatarFallback>Vincent</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-light">
                    Le directeur de salle
                  </CardTitle>
                  <CardDescription className="font-cormorant text-lg font-semibold text-accent">
                    Vincent Du Bois De Maquillé
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Il se forme dans la finance et travaille chez Mazars à Lyon puis
                à Toulouse.
              </p>
              <p className="mb-4">
                En 2024 il décide de se joindre à Paul dans l&apos;aventure Les
                Volets Rouges.
              </p>
              <p>
                Il se forme au métier de la salle notamment au Restaurant Le
                Servan à Paris.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
