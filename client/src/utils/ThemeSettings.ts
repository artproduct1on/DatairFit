import { createTheme } from "@mui/material/styles";

// LIGHT THEME
const lightTheme = createTheme({
  palette: {
    mode: "light",

    // Основні кольори
    primary: { main: "#007aff" },
    secondary: { main: "#6c5ce7" },
    background: {
      default: "rgb(235, 230, 221)",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c1c1e",
      secondary: "#5f5f61",
    },
    error: { main: "#e53935" },
    warning: { main: "#fb8c00" },
    info: { main: "#2196f3" },
    success: { main: "#43a047" },

    divider: "#e0e0e0",
  },
});

// DARK THEME
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ffeb3b" },
    secondary: { main: "#90caf9" },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
    error: { main: "#ef5350" },
    warning: { main: "#ffb74d" },
    info: { main: "#4fc3f7" },
    success: { main: "#81c784" },
    divider: "#424242",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
        },
      })
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "&:active": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
    },
  },
});

export default function ThemeSettings(theme: string) {
  switch (theme) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    default:
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme;
  }
};
