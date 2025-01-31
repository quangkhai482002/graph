import { createContext, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import {
  ColorModeContext,
  useMode,
  FontSizeContext,
  ThemeContext,
} from "./theme";
import { Navbar, SideBar } from "./scenes";
import { Outlet } from "react-router-dom";

interface ToggledContextType {
  toggled: boolean;
  setToggled: (value: boolean) => void;
}

export const ToggledContext = createContext<ToggledContextType | null>(null);

function App(): JSX.Element {
  const [theme, colorMode, fontSizeContext, themeContext] = useMode();
  const [toggled, setToggled] = useState<boolean>(false);
  const values: ToggledContextType = { toggled, setToggled };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <FontSizeContext.Provider value={fontSizeContext}>
        <ThemeContext.Provider value={themeContext}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToggledContext.Provider value={values}>
              <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
                <SideBar />
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    maxWidth: "100%",
                  }}
                >
                  <Navbar />
                  <Box
                    sx={{
                      overflowY: "auto",
                      flex: 1,
                      maxWidth: "100%",
                    }}
                  >
                    <Outlet />
                  </Box>
                </Box>
              </Box>
            </ToggledContext.Provider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </FontSizeContext.Provider>
    </ColorModeContext.Provider>
  );
}

export default App;
