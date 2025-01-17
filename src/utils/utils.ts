import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export const Routes = {
  accueil: "/",
  reserver: "/reserver",
  contact: "/contact",
  blog: "/blog",
  vins: "/vins",
  menu: "/menu",
  admin: "/admin",
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  mentionsLegales: "/mentions-legales",
} as const;

export function formatString(input: string) {
  return input
    .toLowerCase() // Convert all to lowercase
    .replace(/\s+/g, "_"); // Replace all consecutive spaces with a single underscore
}
