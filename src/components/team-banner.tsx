import { Separator } from "~/components/ui/separator";
import { SeparatorBanner } from "./separator-banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function TeamBanner() {
  return (
    <div className="text-sm font-light">
      <Separator />

      <SeparatorBanner title="L'équipe" isMainTitle={false} />
      <Separator />

      <div className="grid gap-8 pt-10 text-lg md:grid-cols-2 lg:px-40">
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
                <CardTitle className="text-3xl font-light">Paul</CardTitle>
                <CardDescription className="font-cormorant text-2xl font-semibold text-accent">
                  Chef de cuisine
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="pb-4">
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
              adéquation avec sa représentation de la cuisine durable, inventive
              et au service du goût.
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
                <CardTitle className="text-3xl font-light">Vincent</CardTitle>
                <CardDescription className="font-cormorant text-2xl font-semibold text-accent">
                  Directeur de salle
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="pb-4">
              Après une formation initiale dans le domaine de la finance à
              l&apos;Université de Lyon, Vincent travaille dans le milieu de
              l&apos;audit financier, chez Forvis Mazars à Lyon puis à Toulouse.
            </p>
            <p>
              Après plusieurs années d&apos;exercice, il décide de se joindre à
              son frère Paul dans l&apos;ouverture de son restaurant, et se
              forme alors au service en salle et à la sommellerie à Paris (Le
              Servan).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
