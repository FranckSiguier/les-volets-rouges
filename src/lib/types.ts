import { z } from "zod";

export const MenuSections = ["starter", "entree", "main", "dessert"] as const;

export type MenuSectionType = (typeof MenuSections)[number];

export const MenuSectionTypeLabel = {
  starter: "Pour Commencer",
  entree: "Entree",
  main: "Plat",
  dessert: "Dessert",
} as const;

export const Drinks = [
  "soft",
  "hot",
  "biere",
  "cidre",
  "champagne",
  "aperitif",
  "sparkling",
  "rose",
  "rouge",
  "blanc",
] as const;

export type DrinkType = (typeof Drinks)[number];

export const DrinkTypeLabel = {
  soft: { label: "Eaux - Sodas - Softs - Mocktails", volume: "" },
  hot: { label: "Boissons Chaudes", volume: "" },
  biere: { label: "Bières - Pressions", volume: "" },
  cidre: { label: "Cidres", volume: "" },
  champagne: { label: "Champagne", volume: "75cl" },
  aperitif: { label: "Apéritifs", volume: "" },
  sparkling: { label: "Vins Pétillants", volume: "75cl" },
  rose: { label: "Vins Rosés", volume: "75cl" },
  rouge: { label: "Vins Rouges", volume: "75cl" },
  blanc: { label: "Vins Blancs", volume: "75cl" },
};

export const DrinkRegion = [
  "Alsace",
  "Bourgogne",
  "Champagne",
  "Jura",
  "Languedoc Roussillon",
  "Provence",
  "Sud-Ouest",
  "Vallée de la Loire",
  "Vallée du Rhône",
  "Savoie",
] as const;

export const insertMenuItemSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(MenuSections),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." })
    .optional(),
  price: z.string().min(1, { message: "Price must be at least 1 character." }),
  menuId: z.number(),
});
export type InsertMenuItemInput = z.infer<typeof insertMenuItemSchema>;

export const insertDrinkSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." })
    .optional(),
  region: z.enum(DrinkRegion).optional(),
  domaine: z.string().optional(),
  appellation: z.string().optional(),
  year: z.string().optional(),
  price: z.string().min(1, { message: "Price must be at least 1 character." }),
  isGlass: z.boolean().optional(),
  type: z.enum(Drinks),
});
export type InsertDrinkInput = z.infer<typeof insertDrinkSchema>;

export const modifyMenuItemSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(MenuSections),
  description: z
    .string()
    .trim()
    .min(2, { message: "Description must be at least 2 characters." })
    .optional(),
  price: z
    .string()
    .trim()
    .min(1, { message: "Price must be at least 1 character." }),
});
export type ModifyMenuItemInput = z.infer<typeof modifyMenuItemSchema>;

export const modifyDrinkSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .trim()
    .min(2, { message: "Description must be at least 2 characters." })
    .optional(),
  price: z
    .string()
    .trim()
    .min(1, { message: "Price must be at least 1 character." }),
  region: z.enum(DrinkRegion).optional(),
  domaine: z.string().optional(),
  appellation: z.string().optional(),
  year: z.string().optional(),
  isGlass: z.boolean().optional(),
  type: z.enum(Drinks),
});

export type ModifyDrinkInput = z.infer<typeof modifyDrinkSchema>;

export const deleteMenuItemSchema = z.object({
  id: z.number(),
});
export type DeleteMenuItemInput = z.infer<typeof deleteMenuItemSchema>;
