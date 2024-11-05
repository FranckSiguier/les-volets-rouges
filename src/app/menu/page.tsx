import MenuNav from "~/components/menu/menu-nav";
import { getActiveMenu } from "../actions";

export default async function MenuPage() {
  const activeMenu = await getActiveMenu();
  return <MenuNav menu={activeMenu} />;
}
