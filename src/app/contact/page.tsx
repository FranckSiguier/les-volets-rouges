import type { Metadata } from "next";

import RestaurantContactForm from "~/components/contact-form";

export const metadata: Metadata = {
  title: "Contact - Les Volets Rouges",
  description: "Découvrez notre menu du midi et du soir.",
};

export default function ContactPage() {
  return <RestaurantContactForm />;
}
