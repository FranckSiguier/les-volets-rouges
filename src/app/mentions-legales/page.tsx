import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales - Les Volets Rouges",
  description: "Mentions légales du site Les Volets Rouges",
};

export default function Legal() {
  return (
    <div className="flex flex-col items-start justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Mentions légales</h1>
      <p className="text-sm opacity-75">En vigueur au 01/01/2021</p>
      <h2 className="text-xl font-bold">Informations légales</h2>
      <p className="text-sm opacity-75">
        Le site
        <span className="font-bold"> lesvoletsrouges.fr </span>
        est édité par Franck Siguier, dont l&apos;adresse mail est
        franck.siguier@gmail.com
      </p>
      <h2 className="text-xl font-bold">Propriété intellectuelle</h2>
      <p className="text-sm opacity-75">
        La structure générale du site
        <span className="font-bold"> lesvoletsrouges.fr</span>, ainsi que les
        textes, graphiques, images, sons et vidéos la composant, sont la
        propriété de la société Les Volets Rouges ou de ses partenaires. Toute
        représentation et/ou reproduction et/ou exploitation partielle ou totale
        des contenus et services proposés par le site
        <span className="font-bold">lesvoletsrouges.fr</span>, par quelque
        procédé que ce soit, sans l&apos;autorisation préalable et par écrit de
        la société Les Volets Rouges et
        <span className="font-bold"> ou de ses partenaires </span>
        est strictement interdite et serait susceptible de constituer une
        contrefaçon au sens des articles L 335-2 et suivants du Code de la
        propriété intellectuelle.
      </p>
      <h2 className="text-xl font-bold">Protection des données personnelles</h2>
      <p className="text-sm opacity-75">
        Nous ne collecton aucune donnée personnelle sur notre site.
      </p>
      <h2 className="text-xl font-bold">Hébergement</h2>
      <p className="text-sm opacity-75">
        Le site <span className="font-bold">lesvoletsrouges.fr</span> est
        hébergé par la société Vercel, dont le siège social est situé au 340 S
        Lemon Ave #4133, Walnut, CA 91789, États-Unis.
      </p>
      <h2 className="text-xl font-bold">Directeur de publication</h2>
      <p className="text-sm opacity-75">Paul Du Bois De Maquillé</p>
      <h2 className="text-xl font-bold">Contact</h2>
      <p className="text-sm opacity-75">
        Pour toute question ou demande d&apos;information concernant le site,
        merci de nous contacter à l&apos;adresse suivante :{" "}
        <span className="font-bold">
          <a href="mailto:franck.siguier@gmail.com">franck.siguier@gmail.com</a>
        </span>
        ou par courrier postal au
        <span className="font-bold"> 1 rue Vélane, 31000 Toulouse</span>.
      </p>
    </div>
  );
}
