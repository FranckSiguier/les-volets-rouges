import Image from "next/image";

export function SeparatorBanner({
  title,
  isMainTitle,
}: {
  title: string;
  isMainTitle: boolean;
}) {
  return (
    <div className="flex items-center justify-center lg:justify-start">
      <Image
        alt="logo fenetre"
        height={200}
        width={200}
        className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]"
        src="/logo-fenetre.png"
      />
      {isMainTitle ? (
        <h1 className="py-4 text-center font-cormorant text-4xl font-thin md:text-5xl lg:text-6xl">
          {title}
        </h1>
      ) : (
        <h2 className="py-4 text-center font-cormorant text-4xl font-thin md:text-5xl lg:text-6xl">
          {title}
        </h2>
      )}

      <Image
        alt="logo fenetre"
        height={200}
        width={200}
        className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] lg:hidden"
        src="/logo-fenetre.png"
      />
    </div>
  );
}
