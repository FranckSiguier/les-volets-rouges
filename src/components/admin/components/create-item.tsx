import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createItem, getActiveMenu } from "~/app/actions";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/hooks/use-toast";
import { insertMenuItemSchema } from "~/lib/types";

export default function CreateItem({
  activeMenu,
}: {
  activeMenu: Awaited<ReturnType<typeof getActiveMenu>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(true);
    const isCreated = await createItem({
      ...formData,
      menuId: activeMenu?.id ?? 1,
    });

    if (!isCreated) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du plat",
      });
      return;
    } else {
      toast({
        title: "Plat ajouté",
        description: "Le plat a été ajouté avec succès",
      });
    }

    setIsOpen(false);
    form.reset();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:text-white">
          Créer un plat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un plat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <SelectItem value="starter">Pour Commencer</SelectItem>
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
      </DialogContent>
    </Dialog>
  );
}
