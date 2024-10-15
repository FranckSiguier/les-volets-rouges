import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#384B70",
        secondary: "#507687",
        accent: "#B8001F",
        background: "#FAF7EB",
      },
    },
  },
  plugins: [],
} satisfies Config;
