// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { Drinks, MenuSections } from "~/lib/types";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `les-volets-rouges_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const drinksType = pgEnum("drink_type", Drinks);
export const drinks = createTable(
  "drink",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    domaine: varchar("domaine", { length: 256 }),
    isGlass: boolean("is_glass").default(false),
    appellation: varchar("appellation", { length: 256 }),
    description: text("description"),
    price: varchar("price", { length: 256 }).notNull(),
    region: varchar("region", { length: 256 }),
    type: drinksType("type").notNull(),
    year: varchar("year"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("drink_name_idx").on(example.name),
  }),
);

// Menu related tables

export const menus = createTable(
  "menu",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    active: boolean("active").default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("menu_name_idx").on(example.name),
  }),
);

export const itemType = pgEnum("item_type", MenuSections);

export const menuItems = createTable(
  "menu_item",
  {
    id: serial("id").primaryKey(),
    menuId: integer("menu_id")
      .references(() => menus.id)
      .notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description"),
    price: varchar("price", { length: 256 }).notNull(),
    type: itemType("type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("menu_item_name_idx").on(example.name),
  }),
);
export type MenuItemType = InferSelectModel<typeof menuItems>;
export type MenuItemInsertType = InferInsertModel<typeof menuItems>;

export const menusRelations = relations(menus, ({ many }) => ({
  menuItems: many(menuItems),
}));
export const menuItemsRelations = relations(menuItems, ({ one }) => ({
  menu: one(menus, {
    fields: [menuItems.menuId],
    references: [menus.id],
  }),
}));
