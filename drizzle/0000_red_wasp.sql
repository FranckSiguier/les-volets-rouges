DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'drink_region') THEN
 	CREATE TYPE "public"."drink_region" AS ENUM('Alsace', 'Auvergne', 'Bordeaux', 'Bourgogne', 'Champagne', 'Corse', 'Étrangers', 'Jura', 'Languedoc', 'Languedoc Roussillon', 'Provence', 'Roussillon', 'Sud-Ouest', 'Loire', 'Beaujolais', 'Rhône', 'Savoie');
 END IF;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'drink_type') THEN
		CREATE TYPE "public"."drink_type" AS ENUM('soft', 'hot', 'biere', 'cidre', 'champagne', 'aperitif', 'sparkling', 'rose', 'rouge', 'blanc', 'cocktail');
	END IF;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
	IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'item_type') THEN
		CREATE TYPE "public"."item_type" AS ENUM('starter', 'entree', 'main', 'dessert');
	END IF;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "les-volets-rouges_drink" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"domaine" text,
	"is_glass" boolean DEFAULT false,
	"appellation" text,
	"description" text,
	"price" varchar(256) NOT NULL,
	"region" "drink_region",
	"type" "drink_type" NOT NULL,
	"year" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "les-volets-rouges_menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"menu_id" serial NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text,
	"price" varchar(256) NOT NULL,
	"type" "item_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "les-volets-rouges_menu_of_the_day" (
	"id" serial PRIMARY KEY NOT NULL,
	"starter" varchar(256) NOT NULL,
	"main" varchar(256) NOT NULL,
	"dessert" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "les-volets-rouges_menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"active" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "les-volets-rouges_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "les-volets-rouges_menu_item" ADD CONSTRAINT "les-volets-rouges_menu_item_menu_id_les-volets-rouges_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."les-volets-rouges_menu"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "drink_name_idx" ON "les-volets-rouges_drink" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "menu_item_name_idx" ON "les-volets-rouges_menu_item" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "menu_name_idx" ON "les-volets-rouges_menu" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "les-volets-rouges_post" USING btree ("name");