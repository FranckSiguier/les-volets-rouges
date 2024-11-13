import { z } from "zod";

export const MenuSectionType = [
  "starter",
  "entree",
  "main",
  "dessert",
] as const;

export const insertMenuItemSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(["main", "entree", "dessert", "starter"]),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." })
    .optional(),
  price: z.string().min(1, { message: "Price must be at least 1 character." }),
  menuId: z.number(),
});
export type InsertMenuItemInput = z.infer<typeof insertMenuItemSchema>;

export const modifyMenuItemSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(["main", "entree", "dessert", "starter"]),
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

export const deleteMenuItemSchema = z.object({
  id: z.number(),
});
export type DeleteMenuItemInput = z.infer<typeof deleteMenuItemSchema>;
