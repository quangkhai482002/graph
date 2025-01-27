import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ToggledContext } from "../../../App";
import { ColorModeContext, tokens } from "../../../theme";

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const toggledContext = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
      bgcolor={colors.primary[600]}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {toggledContext && (
          <IconButton
            sx={{ display: `${isMdDevices ? "flex" : "none"}` }}
            onClick={() => toggledContext.setToggled(!toggledContext.toggled)}
          >
            <MenuOutlined />
          </IconButton>
        )}
      </Box>

      <Box>
        <IconButton onClick={colorMode?.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton>
          <Avatar sx={{ width: 30, height: 30 }}>A</Avatar>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
