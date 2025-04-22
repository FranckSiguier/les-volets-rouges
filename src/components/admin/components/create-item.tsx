import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { createItem, type getActiveMenu, type MenuType } from "~/app/actions";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/hooks/use-toast";
import {
  insertMenuItemSchema,
  MenuSections,
  MenuSectionTypeLabel,
} from "~/lib/types";

export default function CreateItem({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: Awaited<ReturnType<typeof getActiveMenu>>;
  setActiveMenu: React.Dispatch<React.SetStateAction<MenuType>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof insertMenuItemSchema>>({
    resolver: zodResolver(insertMenuItemSchema),
    defaultValues: {
      name: "",
      type: "main",
      description: "",
      menuId: activeMenu?.id,
      price: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof insertMenuItemSchema>) => {
    setIsSubmitting(true);
    setIsOpen(true);
    const { success, id } = await createItem(data);
    if (!success || !id) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du plat",
      });
      return;
    }
    toast({
      title: "Plat ajouté",
      description: "Le plat a été ajouté avec succès",
    });

    if (!activeMenu) {
      return;
    }

    const newItem = {
      ...data,
      id,
      description: data.description ?? "",
    };

    const newMenu = {
      ...activeMenu,
      menuItems: [...activeMenu.menuItems, newItem],
    };

    setActiveMenu(newMenu);
    setIsOpen(false);
    setIsSubmitting(false);
    form.reset();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:text-white">
          Créer un plat
        </Button>
      </DialogTrigger>
      <DialogContent className="p-10 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un plat</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
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
                name="menuId"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Menu ID</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Menu Id" {...field} />
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
                        {MenuSections.map((type) => (
                          <SelectItem key={type} value={type}>
                            {MenuSectionTypeLabel[type]}
                          </SelectItem>
                        ))}
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

              <div className="flex w-full justify-center">
                {isSubmitting ? (
                  <>
                    <Button className="flex w-full cursor-not-allowed items-center justify-center gap-4 bg-accent text-white opacity-60 hover:bg-accent md:w-1/2">
                      <LoaderCircle className="animate-spin" />
                      <p>Création ...</p>
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full items-center bg-accent text-white hover:bg-accent hover:bg-opacity-60 md:w-1/2"
                    type="submit"
                  >
                    Créer
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
