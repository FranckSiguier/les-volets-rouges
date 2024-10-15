import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex">
          <Image
            alt="LesVoletsRougesLogo"
            src={"/2.png"}
            width={500}
            height={500}
          ></Image>
        </div>
        <h1 className="text-4xl font-bold">Site en construction</h1>
      </div>
    </main>
  );
}
