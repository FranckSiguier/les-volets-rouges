import { redirect } from "next/navigation";
import { createClient, getDrinks, getMenuOfTheDay, getMenus } from "../actions";
import RestaurantDashboard from "~/components/admin/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Les Volets Rouges",
  description: "Gérez votre restaurant.",
};

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && process.env.NODE_ENV !== "development") {
    return redirect("/sign-in");
  }

  const menus = await getMenus();
  const drinks = await getDrinks();
  const menuOfTheDay = await getMenuOfTheDay();

  return (
    <RestaurantDashboard
      menus={menus}
      drinks={drinks}
      menuOfTheDay={menuOfTheDay}
    />
  );
}
