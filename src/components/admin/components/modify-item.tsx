import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { type getActiveMenu, type MenuType, modifyItem } from "~/app/actions";
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
  MenuSections,
  MenuSectionTypeLabel,
  modifyMenuItemSchema,
} from "~/lib/types";

type Item = z.infer<typeof modifyMenuItemSchema>;

export default function ModifyItem({
  item,
  activeMenu,
  setActiveMenu,
}: {
  item: Item;
  activeMenu: Awaited<ReturnType<typeof getActiveMenu>>;
  setActiveMenu: React.Dispatch<React.SetStateAction<MenuType>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModifying, setIsModifying] = useState(0);
  const form = useForm<z.output<typeof modifyMenuItemSchema>>({
    resolver: zodResolver(modifyMenuItemSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      type: item.type,
      description: item.description ?? "",
      price: item.price,
    },
  });

  const onModify = async (formData: z.infer<typeof modifyMenuItemSchema>) => {
    setIsModifying(formData.id);
    setIsOpen(true);
    const isModified = await modifyItem({
      ...formData,
      id: formData.id ?? 0,
      menuId: activeMenu?.id ?? 1,
      description: formData.description ?? "",
    });

    if (!isModified) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification du plat",
      });
      return;
    } else {
      toast({
        title: "Plat modifié",
        description: "Le plat a été modifié avec succès",
      });
      const modifiedItem = {
        ...formData,
        description: formData.description ?? "",
      };
      if (!activeMenu) {
        return;
      }

      setActiveMenu({
        ...activeMenu,
        menuItems: activeMenu?.menuItems.map((item) =>
          item.id === formData.id ? modifiedItem : item,
        ),
      });
    }
    setIsOpen(false);
    setIsModifying(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <EditIcon className="absolute right-12 top-4 cursor-pointer hover:text-accent" />
      </DialogTrigger>
      <DialogContent className="p-10 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier un plat</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onModify)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                defaultValue={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormLabel>Id</FormLabel>
                    <FormControl>
                      <Input type="text" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                defaultValue={item.description ?? ""}
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
                defaultValue={item.type}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de plat</FormLabel>
                    <Select onValueChange={field.onChange}>
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
                defaultValue={item.price}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-center">
                {isModifying ? (
                  <>
                    <Button className="flex w-full cursor-not-allowed items-center justify-center gap-4 bg-accent text-white opacity-60 md:w-1/2">
                      <LoaderCircle className="animate-spin" />
                      <p>Modification ...</p>
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full items-center bg-accent text-white hover:bg-accent hover:bg-opacity-60 md:w-1/2"
                    type="submit"
                  >
                    Modifier
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
