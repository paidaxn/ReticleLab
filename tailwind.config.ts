import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"
import tailwindcssAnimate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
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
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // High-contrast color system
        valorant: {
          // Primary reds
          red: "#FF4655",
          "red-dark": "#E63946", 
          "red-light": "#FF6B7A",
          "red-glow": "rgba(255, 70, 85, 0.5)",
          // High-contrast colors
          black: "#000000",
          white: "#FFFFFF",
          "gray-50": "#F9FAFB",
          "gray-100": "#F3F4F6",
          "gray-200": "#E5E7EB",
          "gray-300": "#D1D5DB",
          "gray-400": "#9CA3AF",
          "gray-500": "#6B7280",
          "gray-600": "#4B5563",
          "gray-700": "#374151",
          "gray-800": "#1F2937",
          "gray-900": "#111827",
          // Accent colors
          blue: {
            DEFAULT: "#0066CC",
            dark: "#0052A3",
            light: "#3399FF"
          },
          yellow: {
            DEFAULT: "#FFC700", 
            dark: "#E6B300",
            light: "#FFD333"
          },
          green: {
            DEFAULT: "#00AA44",
            dark: "#008833",
            light: "#33BB66"
          },
          // Status colors
          success: "#00AA44",
          warning: "#FFC700", 
          error: "#FF4655",
          info: "#0066CC"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "var(--font-sans)", ...fontFamily.sans],
        valorant: ["DIN Pro", "Inter", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "SF Mono", "Monaco", "Consolas", "monospace"],
        gaming: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.015em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.005em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.015em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '5rem', letterSpacing: '-0.035em' }],
        '8xl': ['6rem', { lineHeight: '6.5rem', letterSpacing: '-0.04em' }],
        '9xl': ['8rem', { lineHeight: '8.5rem', letterSpacing: '-0.045em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "glow": {
          "0%": { 
            "box-shadow": "0 0 20px rgba(255, 70, 85, 0.5), 0 0 30px rgba(255, 70, 85, 0.3), 0 0 40px rgba(255, 70, 85, 0.1)"
          },
          "100%": { 
            "box-shadow": "0 0 30px rgba(255, 70, 85, 0.8), 0 0 40px rgba(255, 70, 85, 0.5), 0 0 50px rgba(255, 70, 85, 0.2)"
          },
        },
        "pulse-glow": {
          "0%, 100%": { 
            "box-shadow": "0 0 20px rgba(255, 70, 85, 0.4)"
          },
          "50%": { 
            "box-shadow": "0 0 40px rgba(255, 70, 85, 0.8), 0 0 60px rgba(255, 70, 85, 0.4)"
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(255, 70, 85, 0.5)',
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.5)', 
        'glow-lg': '0 0 40px rgba(255, 70, 85, 0.3)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config