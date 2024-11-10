"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UtensilsIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/hooks/use-toast";
import { sendMessage } from "../actions";
import { useState } from "react";
// import Script from "next/script";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  inquiryType: z.enum(["general", "feedback", "other"], {
    required_error: "Please select an inquiry type.",
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
      {/* <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      /> */}
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
                    <SelectItem value="general">Toute questions</SelectItem>
                    <SelectItem value="feedback">
                      Un retour sur votre expérience
                    </SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
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
          {/* <div
            className="g-recaptcha"
            data-sitekey="6LeTkXgqAAAAAC_Aev97oGUwx0ZoH4eWdHOZ1Qw_"
            data-action="LOGIN"
          ></div> */}
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
