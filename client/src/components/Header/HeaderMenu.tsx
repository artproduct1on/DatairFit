import useSettingsStore from "../../store/settingsStore";
// ui
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
// icons
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import SunnyIcon from "@mui/icons-material/Sunny";
import ContrastIcon from "@mui/icons-material/Contrast";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { HeaderMenuProps } from "./types";

const themeOptions = [
  { value: "dark", label: "Dark", icon: <NightlightRoundedIcon fontSize='small' /> },
  { value: "system", label: "System", icon: <ContrastIcon fontSize='small' /> },
  { value: "light", label: "Light", icon: <SunnyIcon /> },
];

const languageOptions = [
  { value: "ua", label: "Українська" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
];

function HeaderMenu({ anchorElUser, setAnchorElUser }: HeaderMenuProps) {
  const { theme, setTheme, lang, setLang } = useSettingsStore();
  const { isAuthenticated, logout } = useAuthStore();
  const [subMenu, setSubMenu] = useState<string | null>(null);

  const handleCloseSubMenu = () => setSubMenu(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const themeMenu = themeOptions.map(({ value, label, icon }) => (
    <MenuItem
      key={value}
      onClick={() => setTheme(value)}
      sx={{
        gap: 2,
        color: theme === value ? "primary.main" : "text.primary",
      }}
    >
      {icon}
      <Typography>{label}</Typography>
    </MenuItem>
  ));

  const languageMenu = languageOptions.map(({ value, label }) => (
    <MenuItem
      key={value}
      onClick={() => setLang(value)}
      sx={{
        gap: 2,
        color: lang === value ? "primary.main" : "text.primary",
      }}
    >
      <Typography >
        {label}
      </Typography>
    </MenuItem>
  ));

  return <>
    <Menu
      keepMounted
      sx={{ mt: 5 }}
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={!!anchorElUser && !subMenu}
      onClose={handleCloseUserMenu}
    >

      <MenuItem
        component={Link}
        to={isAuthenticated ? "/profile" : "/authentication"}
        onClick={handleCloseUserMenu}
        sx={{ gap: 1 }}
      >
        <Typography>
          {isAuthenticated ? "Profile" : "Log in/Sign up"}
        </Typography>
      </MenuItem>

      <Divider />

      <MenuItem
        sx={{ gap: 1 }}
        onClick={() => setSubMenu("theme")}
      >
        <ContrastIcon fontSize='small' />
        <Typography>
          Theme
        </Typography>
      </MenuItem>

      <MenuItem
        sx={{ gap: 1 }}
        onClick={() => setSubMenu("language")}
      >
        <TranslateRoundedIcon fontSize='small' />
        <Typography>
          Language
        </Typography>
      </MenuItem>

      <Divider />

      {isAuthenticated && (
        <MenuItem
          sx={{ gap: 1 }}
          onClick={() => {
            logout();
            handleCloseUserMenu();
          }}
        >
          <LogoutIcon fontSize='small' />
          <Typography sx={{ textAlign: "center" }}>
            Log out
          </Typography>
        </MenuItem>
      )}

    </Menu >

    <Menu
      sx={{ mt: 5 }}
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={!!subMenu}
      onClose={() => {
        handleCloseSubMenu();
        handleCloseUserMenu();
      }}
    >

      <MenuItem
        onClick={handleCloseSubMenu}
        sx={{ gap: 1 }}
      >
        <ArrowBackRoundedIcon fontSize='small' />
        <Typography>Back</Typography>
      </MenuItem>
      <Divider />
      {
        subMenu === "theme" ? themeMenu :
          subMenu === "language" ? languageMenu : null
      }
    </Menu>

  </>;
}

export default HeaderMenu;
