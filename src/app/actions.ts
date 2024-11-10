"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { env } from "~/env";
import { db } from "~/server/db";
import { type MenuItemInsertType, menuItems, menus } from "~/server/db/schema";
import { createClient } from "~/utils/supabase/server";
import { encodedRedirect } from "~/utils/utils";
import { type ContactFormValues } from "./contact/page";
import { revalidatePath } from "next/cache";

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
    with: {
      menuItems: true,
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

export const createItem = async (data: MenuItemInsertType) => {
  await db
    .insert(menuItems)
    .values({
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      menuId: data.menuId,
    })
    .returning({ insertedId: menuItems.id })
    .execute();
  revalidatePath("/admin");
};

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
    to: "restaurant.volets.rouges@gmail.com",
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
