/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: "inherit",
              "font-weight": "400",
              "text-underline-offset": "2px",
              "&:hover": {
                color: "var(--tw-prose-links)",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
