"use client";

import { revalidatePath } from "next/cache";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type MenuType, type getMenus } from "~/app/actions";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { type MenuItemInsertType } from "~/server/db/schema";

// const itemTypes = [
//   { label: "À Partager", value: "starter" },
//   { label: "Entrée", value: "entree" },
//   { label: "Plat", value: "plat" },
//   { label: "Dessert", value: "dessert" },
// ];

export default function RestaurantDashboard({
  menus,
}: {
  menus: Awaited<ReturnType<typeof getMenus>>;
}) {
  const [activeMenu, setActiveMenu] = useState<MenuType>();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      type: "",
    },
  });

  const onSubmit = async (_data: MenuItemInsertType) => {
    // "use server";
    // await createItem({
    //   ...data,
    //   description: data.description ?? "",
    //   menuId: activeMenu?.id ?? 1,
    // });
    form.reset();
    revalidatePath("/admin");
  };

  return (
    <div className="flex w-full rounded-sm bg-secondary p-4">
      <div className="w-1/3 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Menus</h2>
        {menus.map((menu) => (
          <div key={menu.id} className="mb-2 flex items-center space-x-2">
            <Checkbox
              id={`menu-${menu.id}`}
              checked={activeMenu?.id === menu.id}
              onCheckedChange={() => setActiveMenu(menu)}
            />
            <label
              htmlFor={`menu-${menu.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {menu.name}
            </label>
          </div>
        ))}
      </div>
      <div className="w-2/3 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Ajouter un plat</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(() => onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom du plat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Créer</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
