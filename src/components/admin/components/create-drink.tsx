import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { createDrink } from "~/app/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { insertDrinkSchema } from "~/lib/types";

export default function CreateDrink({}: {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof insertDrinkSchema>>({
    resolver: zodResolver(insertDrinkSchema),
    defaultValues: {
      name: "",
      type: "rouge",
      description: "",
      price: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof insertDrinkSchema>) => {
    setIsSubmitting(true);
    setIsOpen(true);
    await createDrink(data);

    setIsOpen(false);
    setIsSubmitting(false);
    form.reset();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:text-white">
          Ajouter une boisson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une boisson</DialogTitle>
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
                    <Input placeholder="Nom" {...field} />
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
                      <SelectItem value="rouge">Rouge</SelectItem>
                      <SelectItem value="blanc">Blanc</SelectItem>
                      <SelectItem value="rose">Rosé</SelectItem>
                      <SelectItem value="biere">Bière</SelectItem>
                      <SelectItem value="cidre">Cidre</SelectItem>
                      <SelectItem value="cocktail">Cocktail</SelectItem>
                      <SelectItem value="soft">Soft</SelectItem>
                      <SelectItem value="champagne">Champagne</SelectItem>
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
      </DialogContent>
    </Dialog>
  );
}
