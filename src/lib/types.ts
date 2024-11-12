import { z } from "zod";

export const MenuSectionType = [
  "starter",
  "entree",
  "main",
  "dessert",
] as const;

export const insertMenuItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(["main", "entree", "dessert", "starter"]),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." })
    .optional(),
  price: z.string().min(1, { message: "Price must be at least 1 character." }),
});
