"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { updateMenuOfTheDay, type getMenuOfTheDay } from "~/app/actions";
import { Button } from "~/components/ui/button";
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
import { menuOfTheDaySchema } from "~/lib/types";

export default function EditMenuOfTheDay({
  menuOfTheDayData,
}: {
  menuOfTheDayData: Awaited<ReturnType<typeof getMenuOfTheDay>>;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof menuOfTheDaySchema>>({
    resolver: zodResolver(menuOfTheDaySchema),
    defaultValues: {
      id: menuOfTheDayData?.id,
      date: menuOfTheDayData?.date,
      starter: menuOfTheDayData?.starter ?? "",
      main: menuOfTheDayData?.main ?? "",
      dessert: menuOfTheDayData?.dessert ?? "",
      starterPrice: menuOfTheDayData?.starterPrice ?? "",
      mainPrice: menuOfTheDayData?.mainPrice ?? "",
      dessertPrice: menuOfTheDayData?.dessertPrice ?? "",
      starterDescription: menuOfTheDayData?.starterDescription ?? "",
      mainDescription: menuOfTheDayData?.mainDescription ?? "",
      dessertDescription: menuOfTheDayData?.dessertDescription ?? "",
    },
  });

  // Update form when menuOfTheDayData changes
  useEffect(() => {
    if (menuOfTheDayData) {
      form.reset({
        id: menuOfTheDayData.id,
        date: menuOfTheDayData.date,
        starter: menuOfTheDayData.starter ?? "",
        main: menuOfTheDayData.main ?? "",
        dessert: menuOfTheDayData.dessert ?? "",
        starterPrice: menuOfTheDayData.starterPrice ?? "",
        mainPrice: menuOfTheDayData.mainPrice ?? "",
        dessertPrice: menuOfTheDayData.dessertPrice ?? "",
        starterDescription: menuOfTheDayData.starterDescription ?? "",
        mainDescription: menuOfTheDayData.mainDescription ?? "",
        dessertDescription: menuOfTheDayData.dessertDescription ?? "",
      });
    }
  }, [menuOfTheDayData, form]);

  const onSubmit = async (data: z.infer<typeof menuOfTheDaySchema>) => {
    setIsSubmitting(true);
    const { success } = await updateMenuOfTheDay(data);
    if (!success) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la mise à jour du menu du jour",
      });
      setIsSubmitting(false);
      return;
    }
    toast({
      title: "Menu du jour mis à jour",
      description: "Le menu du jour a été mis à jour avec succès",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="flex w-full flex-col items-center bg-background p-6">
      <div className="w-full max-w-4xl">
        <h2 className="mb-6 text-2xl font-light">Menu du jour</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Starter Section */}
            <div className="space-y-4 rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Entrée</h3>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="starter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de l'entrée" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="starterPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="starterDescription"
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
            </div>

            {/* Main Section */}
            <div className="space-y-4 rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Plat</h3>
              <FormField
                control={form.control}
                name="main"
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
                name="mainPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mainDescription"
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
            </div>

            {/* Dessert Section */}
            <div className="space-y-4 rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Dessert</h3>
              <FormField
                control={form.control}
                name="dessert"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du dessert" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dessertPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dessertDescription"
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
            </div>

            <div className="flex w-full justify-center">
              {isSubmitting ? (
                <Button className="flex w-full cursor-not-allowed items-center justify-center gap-4 bg-accent text-white opacity-60 hover:bg-accent md:w-1/2">
                  <LoaderCircle className="animate-spin" />
                  <p>Mise à jour ...</p>
                </Button>
              ) : (
                <Button
                  className="w-full items-center bg-accent text-white hover:bg-accent hover:bg-opacity-60 md:w-1/2"
                  type="submit"
                >
                  Enregistrer
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
