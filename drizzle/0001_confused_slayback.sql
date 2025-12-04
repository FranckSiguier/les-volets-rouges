ALTER TABLE "les-volets-rouges_menu_of_the_day" ADD COLUMN "starter_price" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "les-volets-rouges_menu_of_the_day" ADD COLUMN "main_price" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "les-volets-rouges_menu_of_the_day" ADD COLUMN "dessert_price" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "les-volets-rouges_menu_of_the_day" ADD COLUMN "starter_description" text;--> statement-breakpoint
ALTER TABLE "les-volets-rouges_menu_of_the_day" ADD COLUMN "main_description" text;--> statement-breakpoint
ALTER TABLE "les-volets-rouges_menu_of_the_day" ADD COLUMN "dessert_description" text;