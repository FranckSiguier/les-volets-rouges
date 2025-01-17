import { redirect } from "next/navigation";
import { createClient, getDrinks, getMenus } from "../actions";
import RestaurantDashboard from "~/components/admin/dashboard";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const menus = await getMenus();
  const drinks = await getDrinks();

  return <RestaurantDashboard menus={menus} drinks={drinks} />;
}
