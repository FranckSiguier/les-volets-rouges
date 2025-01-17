"use server";

import { createServerClient } from "@supabase/ssr";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { type Block } from "~/components/blog-form";
import { type ContactFormValues } from "~/components/contact-form";
import { env } from "~/env";
import type {
  InsertDrinkInput,
  InsertMenuItemInput,
  MenuSectionType,
  ModifyDrinkInput,
} from "~/lib/types";
import { IMAGE_VOLETS_ROUGES, VOLETS_EMAIL } from "~/lib/variables";
import { db } from "~/server/db";
import { drinks, menuItems, menus, posts } from "~/server/db/schema";
import { encodedRedirect } from "~/utils/utils";

export const createClient = async () => {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.error(error);
          }
        },
      },
    },
  );
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/admin");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const getActiveMenu = async () => {
  const menu = await db.query.menus.findFirst({
    columns: {
      id: true,
      name: true,
    },
    with: {
      menuItems: {
        columns: {
          id: true,
          name: true,
          description: true,
          price: true,
          type: true,
        },
      },
    },
    where: eq(menus.active, true),
  });

  return menu;
};
export type MenuType = Awaited<ReturnType<typeof getActiveMenu>>;

export const getMenus = async () => {
  const menus = await db.query.menus.findMany({
    with: {
      menuItems: true,
    },
  });

  return menus;
};
export type MenusType = Awaited<ReturnType<typeof getMenus>>;

export const getDrinks = async () => {
  const drinks = await db.query.drinks.findMany();

  return drinks;
};
export type DrinksType = Awaited<ReturnType<typeof getDrinks>>[number];

export async function createItem(data: InsertMenuItemInput): Promise<{
  success: boolean;
  id?: number;
}> {
  const result = await db
    .insert(menuItems)
    .values({
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      menuId: data.menuId,
    })
    .returning({ id: menuItems.id })
    .execute();

  if (result) {
    console.log(`Item  created successfully`);

    // Trigger revalidation after the creation
    revalidatePath("/admin");
    revalidatePath("/menu");

    return { success: true, id: result[0]?.id };
  } else {
    console.log(`Failed to create item`);
    return { success: false };
  }
}

export async function createDrink(drink: InsertDrinkInput) {
  await db
    .insert(drinks)
    .values({
      name: drink.name,
      price: drink.price,
      type: drink.type,
      region: drink.region,
      domaine: drink.domaine,
      appellation: drink.appellation,
      year: drink.year,
      isGlass: drink.isGlass,
    })
    .execute();

  // Trigger revalidation after the creation
  revalidatePath("/admin");
  revalidatePath("/vins");

  redirect("/admin");
}

export async function deleteItem(id: number) {
  const result = await db
    .delete(menuItems)
    .where(eq(menuItems.id, id))
    .execute();

  if (result) {
    console.log(`Item with ID ${id} deleted successfully`);

    // Trigger revalidation after the deletion
    revalidatePath("/admin");
    revalidatePath("/menu");

    return true; // Return true to indicate successful deletion
  } else {
    console.log(`Failed to delete item with ID ${id}`);
    return false;
  }
}

export async function deleteDrink(id: number) {
  await db.delete(drinks).where(eq(drinks.id, id)).execute();

  // Trigger revalidation after the deletion
  revalidatePath("/admin");
  revalidatePath("/vins");

  redirect("/admin");
}

export async function modifyDrink(drink: ModifyDrinkInput) {
  await db
    .update(drinks)
    .set({
      name: drink.name,
      price: drink.price,
      type: drink.type,
      region: drink.region,
      domaine: drink.domaine,
      appellation: drink.appellation,
      year: drink.year,
      isGlass: drink.isGlass,
    })
    .where(eq(drinks.id, drink.id))
    .execute();

  revalidatePath("/admin");
  revalidatePath("/vins");

  redirect("/admin");
}

export async function modifyItem(data: {
  id: number;
  name: string;
  description: string;
  price: string;
  type: MenuSectionType;
  menuId: number;
}) {
  const { id, name, description, price, type, menuId } = data;

  try {
    const result = await db
      .update(menuItems)
      .set({
        name: name,
        description: description,
        price: price,
        type: type,
        menuId: menuId,
      })
      .where(eq(menuItems.id, id))
      .execute();

    if (result) {
      console.log(`Item with ID ${id} updated successfully`);

      revalidatePath("/admin");
      revalidatePath("/menu");

      return true;
    } else {
      console.log(`Failed to update item with ID ${id}`);
      return false;
    }
  } catch (error) {
    console.error("Error updating item:", error);
    return false;
  }
}

export const sendMessage = async (data: ContactFormValues) => {
  // const secretKey = env.RECAPTCHA_SECRET_KEY;

  // const response = await fetch(
  //   `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
  //   {
  //     method: "POST",
  //   },
  // );

  // const verificationData = (await response.json()) as { success: boolean };
  // if (!verificationData.success) {
  //   return false;
  // }

  const resend = new Resend(env.RESEND_API_KEY);

  await resend.emails.send({
    from: "contact@lesvoletsrouges.fr",
    to: VOLETS_EMAIL,
    subject: "Message depuis formulaire de contact",
    html: `
        <p><strong>Nom:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.phone}</p>
        <p><strong>Type de demande:</strong> ${data.inquiryType}</p>
        <p><strong>Message:</strong> ${data.message}</p>
        `,
  });

  return true;
};

export type PostsPreviewType = {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  coverImage: string;
  excerpt: string;
}[];

export const getBlogPosts = async (): Promise<PostsPreviewType> => {
  const posts = await db.query.posts.findMany();

  // For each post we will read the content to find the url of the cover image
  // and the excerpt

  const postsWithPreviews = posts.map((post) => {
    const content = JSON.parse(post.content) as Block[];
    const coverImage =
      content.find((block) => block.type === "image")?.content ??
      IMAGE_VOLETS_ROUGES;
    const excerptBlock = content.find((block) => block.type === "text");
    const excerpt = excerptBlock?.content.slice(0, 50) + "...";

    return {
      id: post.id,
      name: post.name,
      coverImage,
      excerpt,
      createdAt: post.createdAt.toISOString(),
      content: post.content,
    };
  });

  return postsWithPreviews;
};

type BlogPostType = {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  coverImage: string;
};
export const getBlogPost = async (id: string): Promise<BlogPostType | null> => {
  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, +id),
  });

  if (!post) {
    return null;
  }
  const content = JSON.parse(post.content) as Block[];

  const coverImage =
    content.find((block) => block.type === "image")?.content ??
    IMAGE_VOLETS_ROUGES;

  return {
    id: post.id,
    name: post.name,
    content: post.content,
    createdAt: post.createdAt.toISOString(),
    coverImage,
  };
};

export const uploadBlogPost = async (data: {
  name: string;
  content: Block[];
}) => {
  const post = await db
    .insert(posts)
    .values({
      name: data.name,
      content: JSON.stringify(data.content),
    })
    .returning({ id: posts.id })
    .execute();

  if (post) {
    console.log(`Post created successfully`);

    // Trigger revalidation after the creation
    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true, id: post[0]?.id };
  } else {
    console.log(`Failed to create post`);
    return { success: false };
  }
};
