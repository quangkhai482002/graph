import { createTheme, Theme } from "@mui/material";
import { useMemo, useState, createContext } from "react";

type Mode = "light" | "dark";

type ColorTokens = {
  gray: Record<number, string>;
  primary: Record<number, string>;
};

// Color Design Tokens
export const tokens = (mode: Mode): ColorTokens => ({
  ...(mode === "dark"
    ? {
        gray: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#434957",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
      }
    : {
        gray: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#434957",
          500: "#f2f0f0",
          600: "#fcfcfc",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
      }),
});
type ThemeSettings = (mode: Mode) => Theme;
export const themeSettings: ThemeSettings = (mode) => {
  const colors = tokens(mode);

  return createTheme({
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            background: {
              default: colors.primary[500],
            },
          }),
    },
  });
};
type ColorModeContextType = {
  toggleColorMode: () => void;
};
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});
export const useMode = (): [Theme, ColorModeContextType] => {
  const [mode, setMode] = useState<Mode>("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = useMemo(() => themeSettings(mode), [mode]);
  return [theme, colorMode];
};
