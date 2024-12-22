"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { UtensilsIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendMessage } from "~/app/actions";
import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.string().optional(),
  inquiryType: z.enum(["group_booking", "feedback", "voucher", "other"], {
    required_error: "Veuillez sélectionner une raison.",
  }),
  message: z.string().optional(),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function RestaurantContactForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: undefined,
      message: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof contactFormSchema>) {
    setLoading(true);
    await sendMessage(formData);
    toast({
      title: "Merci pour votre message!",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setLoading(false);
    form.reset();
  }

  return (
    <div className="mx-auto mt-10 w-full lg:w-1/2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-lg border border-accent bg-background p-8 shadow-lg"
        >
          <div className="text-center">
            <UtensilsIcon className="mx-auto h-12 w-12 text-accent" />
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Contactez nous
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Pour toute question, n&apos;hésitez pas à nous contacter.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="vous@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inquiryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raison</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Raison" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="feedback">
                      Un retour sur votre expérience
                    </SelectItem>
                    <SelectItem value="group_booking">
                      Une réservation de groupe
                    </SelectItem>
                    <SelectItem value="voucher">
                      Offrir un bon cadeau
                    </SelectItem>
                    <SelectItem value="other">Autres</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Votre message"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-accent text-white hover:bg-accent hover:bg-opacity-60"
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Envoi ..." : "Envoyer"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
