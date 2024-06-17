/** @type {import('tailwindcss').Config} */
import ui from "franken-ui";

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.html"
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
      },
      dropShadow: {
        custom: '4px 4px 10px rgba(0, 0, 0, .30)'
      },
      boxShadow: {
        custom: '4px 4px 10px rgba(0, 0, 0, .30)'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "scale": { '50%': { transform: 'scale(1.1)' } },
        scroll: { to: { transform: "translate(calc(-50% - 0.5rem))" }, },
        border: {
          '0%, 100%': { borderRadius: '5px 25px 5px 25px' },
          '50%': { borderRadius: '25px 5px 25px 5px' },
        },
        shake: {
          '0%, 10%': { transform: 'skewY(-5deg)' },
          '5%, 5%': { transform: 'skewY(5deg)' },
          '20%, 100%': { transform: 'skewY(0deg)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scale: 'scale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        borderRadius: "border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shake: 'shake 1.3s cubic-bezier(0.4, 0, 0.6, 1) infinite 10s'
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
  function ({ addUtilities }) {
    const newUtilities = {
      '.animation-pause': {
        'animation-play-state': 'paused',
      },
    }
    addUtilities(newUtilities, ['responsive', 'hover'])
  },
  ui({
    components: {
      accordion: {
        hooks: {}
      }
    }
  }),
  ],
}

