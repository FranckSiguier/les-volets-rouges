import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Les Volets Rouges",
  description: "Découvrez les dernières actualités de notre restaurant.",
};

export default function BlogPage() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      Vous verrez ici les articles du blog
    </div>
  );
}
