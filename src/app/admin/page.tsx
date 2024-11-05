import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";
import { getMenus } from "../actions";
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

  return <RestaurantDashboard menus={menus} />;
}
