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
  "cocktail",
] as const;

export type DrinkType = (typeof Drinks)[number];

export const DrinkTypeLabel = {
  cocktail: { label: "Cocktails du moment", volume: "" },
  soft: { label: "Eaux & Softs", volume: "" },
  hot: { label: "Boissons Chaudes", volume: "" },
  biere: { label: "Bières & Cidres", volume: "" },
  cidre: { label: "Vins de Pommes", volume: "75cl" },
  champagne: { label: "Champagne", volume: "75cl" },
  aperitif: { label: "Alcool & Spiritueux", volume: "" },
  sparkling: { label: "Bulles", volume: "75cl" },
  rose: { label: "Vins Rosés", volume: "75cl" },
  rouge: { label: "Vins Rouges", volume: "75cl" },
  blanc: { label: "Vins Blancs", volume: "75cl" },
};

export const DrinkRegion = [
  "Alsace",
  "Auvergne",
  "Bordeaux",
  "Bourgogne",
  "Champagne",
  "Corse",
  "Étrangers",
  "Jura",
  "Languedoc",
  "Languedoc Roussillon",
  "Provence",
  "Roussillon",
  "Sud-Ouest",
  "Loire",
  "Beaujolais",
  "Rhône",
  "Savoie",
] as const;
export type DrinkRegionType = (typeof DrinkRegion)[number];

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
  type: z.enum(Drinks),
  price: z.string().min(1, { message: "Price must be at least 1 character." }),
  isGlass: z.boolean().optional(),
  domaine: z.string().optional(),
  appellation: z.string().optional(),
  region: z.enum(DrinkRegion).optional(),
  year: z.string().optional(),
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
  type: z.enum(Drinks),
  price: z
    .string()
    .trim()
    .min(1, { message: "Price must be at least 1 character." }),
  isGlass: z.boolean().optional(),
  domaine: z.string().optional(),
  appellation: z.string().optional(),
  region: z.enum(DrinkRegion).optional(),
  year: z.string().optional(),
});

export type ModifyDrinkInput = z.infer<typeof modifyDrinkSchema>;

export const deleteMenuItemSchema = z.object({
  id: z.number(),
});
export type DeleteMenuItemInput = z.infer<typeof deleteMenuItemSchema>;

export const menuOfTheDaySchema = z.object({
  id: z.number().optional(),
  starter: z.string().min(1, { message: "Starter name is required." }),
  main: z.string().min(1, { message: "Main dish name is required." }),
  dessert: z.string().min(1, { message: "Dessert name is required." }),
  starterPrice: z.string().min(1, { message: "Starter price is required." }),
  mainPrice: z.string().min(1, { message: "Main dish price is required." }),
  dessertPrice: z.string().min(1, { message: "Dessert price is required." }),
  starterDescription: z.string().optional(),
  mainDescription: z.string().optional(),
  dessertDescription: z.string().optional(),
});
export type MenuOfTheDayInput = z.infer<typeof menuOfTheDaySchema>;
