"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createItem, type MenuType, type getMenus } from "~/app/actions";
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
import { toast } from "~/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export const insertMenuItemSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(["main", "entree", "dessert", "starter"]),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  price: z.string().min(1, { message: "Price must be at least 1 character." }),
});

export default function RestaurantDashboard({
  menus,
}: {
  menus: Awaited<ReturnType<typeof getMenus>>;
}) {
  const [activeMenu, setActiveMenu] = useState<MenuType>(menus[0]);
  const form = useForm<z.infer<typeof insertMenuItemSchema>>({
    resolver: zodResolver(insertMenuItemSchema),
    defaultValues: {
      name: "",
      type: "main",
      description: "",
      price: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof insertMenuItemSchema>) => {
    console.log(formData);

    await createItem({
      ...formData,
      menuId: activeMenu?.id ?? 1,
    });
    toast({
      title: "Plat ajouté",
      description: "Le plat a été ajouté avec succès",
    });

    form.reset();
  };

  return (
    <div className="flex w-full rounded-sm bg-background p-4">
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
                onSubmit={form.handleSubmit(onSubmit)}
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de plat</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Type de plat" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="starter">A Partager</SelectItem>
                          <SelectItem value="entree">Entree</SelectItem>
                          <SelectItem value="main">Plat</SelectItem>
                          <SelectItem value="dessert">Dessert</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Input type="text" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full bg-accent text-white hover:bg-accent hover:bg-opacity-60"
                  type="submit"
                >
                  Créer
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
