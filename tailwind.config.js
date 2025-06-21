/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input-bg))",
          ring: "hsl(var(--sidebar-ring))",
          background: "hsl(var(--bg-main))",
          foreground: "hsl(var(--text-main))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "hsl(var(--text-secondary))",
            foreground: "#000000",
          },
          sidebar: {
            DEFAULT: "hsl(var(--color-sidebar))",
            foreground: "hsl(var(--color-sidebar-foreground))",
            primary: "hsl(var(--color-sidebar-primary))",
            "primary-foreground": "hsl(var(--color-sidebar-primary-foreground))",
            accent: "hsl(var(--color-sidebar-accent))",
            "accent-foreground": "hsl(var(--color-sidebar-accent-foreground))",
            border: "hsl(var(--color-sidebar-border))",
            ring: "hsl(var(--color-sidebar-ring))",
          }
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  };
  