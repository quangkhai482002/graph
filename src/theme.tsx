import { createTheme, Theme } from "@mui/material";
import { useMemo, useState, createContext, useEffect } from "react";

type Mode = "light" | "dark";

type ColorTokens = {
  gray: Record<number, string>;
  primary: Record<number, string>;
};

export const tokens = (mode: Mode): ColorTokens => ({
  ...(mode === "dark"
    ? {
        gray: { 100: "#e0e0e0", 300: "#a3a3a3" },
        primary: { 100: "#d0d1d5", 500: "#141b2d", 600: "#101624" },
      }
    : {
        gray: { 100: "#141414", 300: "#3d3d3d" },
        primary: { 100: "#040509", 500: "#f2f0f0", 600: "#fcfcfc" },
      }),
});
type ThemeSettings = (
  mode: Mode,
  fontSize: number,
  primaryColor: string
) => Theme;
export const themeSettings: ThemeSettings = (mode, fontSize, primaryColor) => {
  const colors = tokens(mode);

  return createTheme({
    palette: {
      // mode: mode,
      // ...(mode === "dark"
      //   ? {
      //       primary: { main: colors.primary[100] },
      //       background: { default: colors.primary[500] },
      //     }
      //   : {
      //       primary: { main: colors.primary[100] },
      //       background: { default: colors.primary[500] },
      //     }),
      mode: mode,
      primary: { main: primaryColor }, // Use dynamic primary color
      background: { default: colors.primary[500] },
    },
    typography: {
      h4: { fontSize: fontSize + 6 },
      h5: { fontSize: fontSize + 2 },
      h6: { fontSize: fontSize },
    },
  });
};
type ColorModeContextType = {
  toggleColorMode: () => void;
};
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
});
type FontSizeContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
};
export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 14,
  setFontSize: () => {},
});
type ThemeContextType = {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  primaryColor: "#d0d1d5",
  setPrimaryColor: () => {},
});

export const useMode = (): [
  Theme,
  ColorModeContextType,
  FontSizeContextType,
  ThemeContextType
] => {
  const storedMode = (localStorage.getItem("themeMode") as Mode) || "dark";
  const storedFontSize = Number(localStorage.getItem("fontSize")) || 14;
  const storedPrimaryColor = localStorage.getItem("primaryColor") || "#d0d1d5";

  const [mode, setMode] = useState<Mode>(storedMode);
  const [fontSize, setFontSize] = useState<number>(storedFontSize);
  const [primaryColor, setPrimaryColor] = useState<string>(storedPrimaryColor);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);
  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const fontSizeContext = useMemo(
    () => ({ fontSize, setFontSize }),
    [fontSize]
  );
  const themeContext = useMemo(
    () => ({ primaryColor, setPrimaryColor }),
    [primaryColor]
  );

  const theme = useMemo(
    () => themeSettings(mode, fontSize, primaryColor),
    [mode, fontSize, primaryColor]
  );
  return [theme, colorMode, fontSizeContext, themeContext];
};
