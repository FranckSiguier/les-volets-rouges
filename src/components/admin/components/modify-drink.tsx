import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { type DrinksType, modifyDrink } from "~/app/actions";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  DrinkRegion,
  type DrinkRegionType,
  Drinks,
  DrinkTypeLabel,
  modifyDrinkSchema,
} from "~/lib/types";

export default function ModifyDrink({ item }: { item: DrinksType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModifying, setIsModifying] = useState(0);
  const form = useForm<z.output<typeof modifyDrinkSchema>>({
    resolver: zodResolver(modifyDrinkSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      type: item.type,
      price: item.price,
      isGlass: item.isGlass ?? false,
      appellation: item.appellation ?? undefined,
      domaine: item.domaine ?? undefined,
      year: item.year ?? undefined,
      region: (item.region as DrinkRegionType) ?? undefined,
    },
  });

  const onSubmit = async (formData: z.infer<typeof modifyDrinkSchema>) => {
    setIsModifying(formData.id);
    setIsOpen(true);
    await modifyDrink(formData);
    setIsOpen(false);
    setIsModifying(0);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <EditIcon className="absolute right-12 top-4 cursor-pointer hover:text-accent" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier une boisson</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="name"
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de boisson</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type de boisson" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Drinks.map((drink) => (
                        <SelectItem key={drink} value={drink}>
                          {DrinkTypeLabel[drink].label}
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
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isGlass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Est ce un vin au verre ? </FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domaine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domaine</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appellation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appellation</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DrinkRegion.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
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
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année</FormLabel>
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
      </DialogContent>
    </Dialog>
  );
}
