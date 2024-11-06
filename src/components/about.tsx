import Image from "next/image";
import { Separator } from "./ui/separator";
import { Video } from "./video";

export function About() {
  return (
    <>
      <section className="relative mb-10 mt-10 h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-3">
          <div className="relative z-10 col-span-2 flex flex-col items-start justify-center p-8 font-cormorant">
            <h1 className="mb-8 text-3xl text-accent md:text-5xl lg:text-8xl">
              Du terroir.
            </h1>
            <h2 className="text-3xl text-accent md:text-5xl lg:text-8xl">
              Du savoir faire.
            </h2>
          </div>
          <div className="col-span-1" />
        </div>
        <div className="absolute inset-0 left-[25%]">
          <Video path="/videos/hero-video.mp4" />
          <div className="absolute inset-0 w-full rounded-full bg-black opacity-30" />
        </div>
      </section>
      <section className="w-full">
        <Separator />
        <h1 className="py-4 font-cormorant text-2xl font-thin text-accent md:text-4xl lg:text-6xl">
          Notre histoire
        </h1>
        <Separator className="max-w-xl" />
        <div className="flex flex-col justify-between py-10 lg:flex-row">
          <p className="max-w-md py-10">
            Les Volets Rouges c'est un clin d'œil a notre région d'origine, le
            pays basque bien sur. L'idée est de travailler à partir de produits
            bruts que nous sélectionnons avec soins, d'Occitanie, du pays basque
            et un peu d'ailleurs. Ils sont issus de l'agriculture biologique et
            raisonnée, d'élevage fermier et de pêche durable. Nos vins sont
            biologique et/ou naturelles pour la majorité.
          </p>
          <Image
            className="-mt-20 rounded-full"
            src={"/cook-restaurant.jpg"}
            alt="Chef cuisine"
            width={624}
            height={416}
          />
        </div>
        <Separator />
      </section>
      <section className="flex w-full flex-col items-center justify-between lg:flex-row">
        <Image
          className="rounded-full"
          src={"/plat1.jpg"}
          alt="Plat français"
          width={250}
          height={200}
        />
        <Image
          className="mt-20 rounded-full"
          src={"/plat2.jpg"}
          alt="Plat français"
          width={250}
          height={200}
        />
        <Image
          className="rounded-full"
          src={"/plat3.jpg"}
          alt="Plat français"
          width={250}
          height={200}
        />
        <Image
          className="mt-20 rounded-full"
          src={"/plat4.jpg"}
          alt="Plat français"
          width={250}
          height={200}
        />
      </section>
    </>
  );
}
