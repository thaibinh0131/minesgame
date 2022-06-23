import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import typography from "windicss/plugin/typography";

export default defineConfig({
  darkMode: "class",
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,

  plugins: [typography()],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "inherit",
            a: {
              color: "inherit",
              opacity: 0.75,
              fontWeight: "500",
              textDecoration: "underline",
              "&:hover": {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: "inherit" },
            strong: { color: "inherit" },
            em: { color: "inherit" },
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },
            h4: { color: "inherit" },
            code: { color: "inherit" },
          },
        },
      },
      colors: {
        "dark-blue": "#0079FE",
        "light-gray": "#AFB4BE",
        "dark-gray": "#607290",
        "light-green": "#43D4A8",
        "light-red": "#E95A63",
        "dark-red": "#961484",
        "card-dark": "#050510B2",
        "middle-blue": "30D9FF",
        neutral: {
          main: "#23293B",
          1: "#EAECEF",
          7: "#607290",
          8: "#4d5562",
          9: "#272F3E",
          10: "#050510",
        },

        icon: {
          default: "#5C5F62",
        },
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      laptop: "1280px",
      xxl: "1400px",
    },
  },
});
