import {
  DashboardOutlined,
  MenuOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { ToggledContext } from "../../../App";
import logo from "../../../assets/images/logo.png";
import { tokens } from "../../../theme";
import Item from "./Item";

interface SideBarProps {
  orientation: "vertical" | "horizontal";
}

const SideBar = ({ orientation }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggledContext = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {orientation === "vertical" ? (
        <Sidebar
          backgroundColor={colors.primary[600]}
          rootStyles={{
            border: 0,
            height: "100vh",
          }}
          collapsed={collapsed}
          onBackdropClick={() => toggledContext?.setToggled(false)}
          toggled={toggledContext?.toggled}
          breakPoint="md"
        >
          <Menu
            menuItemStyles={{
              button: { ":hover": { background: "transparent" } },
            }}
          >
            <MenuItem
              rootStyles={{
                margin: "10px 0 20px 0",
                color: colors.gray[100],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {!collapsed && (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="10px"
                    sx={{ transition: ".3s ease" }}
                  >
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "8px",
                      }}
                      src={logo}
                      alt="Argon"
                    />
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      textTransform="capitalize"
                      color="#157bf8"
                    >
                      MP
                    </Typography>
                  </Box>
                )}
                <IconButton onClick={() => setCollapsed(!collapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            </MenuItem>
          </Menu>

          <Box mb={5} px={collapsed ? undefined : "5%"}>
            <Menu
              menuItemStyles={{
                button: {
                  ":hover": {
                    color: colors.gray[300],
                    background: "rgba(134, 141, 251, 0.1)",
                    transition: ".4s ease",
                    borderRadius: "15px",
                  },
                },
              }}
            >
              <Item title="Dashboard" path="/" icon={<DashboardOutlined />} />
            </Menu>
            <Typography
              variant="h6"
              color={colors.gray[300]}
              sx={{ m: "10px 0 5px 10px" }}
            >
              {!collapsed ? "Manage accounts" : " "}
            </Typography>

            <Menu
              menuItemStyles={{
                button: {
                  ":hover": {
                    color: colors.gray[300],
                    background: "rgba(134, 141, 251, 0.1)",
                    transition: ".4s ease",
                    borderRadius: "15px",
                  },
                },
              }}
            >
              <Item
                title="Accounts"
                path="/account"
                icon={<PeopleAltOutlined />}
              />
            </Menu>
          </Box>
        </Sidebar>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            p: 1,
          }}
        >
          <Menu
            menuItemStyles={{
              button: {
                ":hover": {
                  color: colors.gray[300],
                  background: "rgba(134, 141, 251, 0.1)",
                  transition: ".4s ease",
                  borderRadius: "15px",
                },
              },
            }}
          >
            <Item title="Dashboard" path="/" icon={<DashboardOutlined />} />
          </Menu>
          <Menu
            menuItemStyles={{
              button: {
                ":hover": {
                  color: colors.gray[300],
                  background: "rgba(134, 141, 251, 0.1)",
                  transition: ".4s ease",
                  borderRadius: "15px",
                },
              },
            }}
          >
            <Item
              title="Accounts"
              path="/account"
              icon={<PeopleAltOutlined />}
            />
          </Menu>
        </Box>
      )}
    </>
  );
};

export default SideBar;
