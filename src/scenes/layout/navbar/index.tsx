import {
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Slider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ToggledContext } from "../../../App";
import {
  ColorModeContext,
  tokens,
  FontSizeContext,
  ThemeContext,
} from "../../../theme";

interface NavbarProps {
  setOrientation: (orientation: "vertical" | "horizontal") => void;
}

const Navbar = ({ setOrientation }: NavbarProps) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const toggledContext = useContext(ToggledContext);
  const fontSizeContext = useContext(FontSizeContext);
  const themeContext = useContext(ThemeContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
        <IconButton onClick={toggleDrawer(true)}>
          <SettingsOutlined />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <List sx={{ width: 250 }} role="presentation">
            <ListItem disablePadding>
              <Slider
                sx={{ width: 200, margin: "auto", py: 10 }}
                aria-label="Font Size"
                defaultValue={14}
                value={fontSizeContext.fontSize}
                onChange={(_, newValue) =>
                  fontSizeContext.setFontSize(newValue as number)
                }
                valueLabelDisplay="auto"
                step={2}
                marks
                min={10}
                max={30}
              />
            </ListItem>
            <ListItem>
              <Button
                onClick={() => themeContext.setPrimaryColor("#ff0000")}
                sx={{ color: "red" }}
              >
                Red
              </Button>
              <Button
                onClick={() => themeContext.setPrimaryColor("#0000ff")}
                sx={{ color: "blue" }}
              >
                Blue
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => setOrientation("vertical")}>
                Vertical
              </Button>
              <Button onClick={() => setOrientation("horizontal")}>
                Horizontal
              </Button>
            </ListItem>
          </List>
        </Drawer>
        <IconButton>
          <Avatar sx={{ width: 30, height: 30 }}>A</Avatar>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
