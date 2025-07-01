import useSettingsStore from "../../store/settingsStore";
import t from "./translate.json";
// ui
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
// icon
import ContrastIcon from "@mui/icons-material/Contrast";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { HeaderMenuProps } from "./types";
import { languageOptions, themeOptions } from "./helpers";

function HeaderMenu({ anchorElUser, setAnchorElUser }: HeaderMenuProps) {

  const [subMenu, setSubMenu] = useState<string | null>(null);
  const { theme, setTheme, lang, setLang } = useSettingsStore();
  const { isAuthenticated, logout } = useAuthStore();

  const handleCloseSubMenu = () => setSubMenu(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const themeMenu = themeOptions(lang).map(({ value, label, Icon }) => (
    <MenuItem
      key={value}
      onClick={() => setTheme(value)}
      sx={{
        gap: 2,
        color: theme === value ? "primary.main" : "text.primary",
      }}
    >
      <Icon />
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
          {isAuthenticated ? t[lang].profile : t[lang].login}
        </Typography>
      </MenuItem>

      <Divider />

      <MenuItem
        sx={{ gap: 1 }}
        onClick={() => setSubMenu("theme")}
      >
        <ContrastIcon fontSize='small' />
        <Typography>
          {t[lang].theme}
        </Typography>
      </MenuItem>

      <MenuItem
        sx={{ gap: 1 }}
        onClick={() => setSubMenu("language")}
      >
        <TranslateRoundedIcon fontSize='small' />
        <Typography>
          {t[lang].language}
        </Typography>
      </MenuItem>

      {isAuthenticated && <>
        <Divider />
        <MenuItem
          sx={{ gap: 1 }}
          onClick={() => {
            logout();
            handleCloseUserMenu();
          }}
        >
          <LogoutIcon fontSize='small' />
          <Typography sx={{ textAlign: "center" }}>
            {t[lang].logout}
          </Typography>
        </MenuItem>
      </>
      }

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
        <Typography>
          {t[lang].back}
        </Typography>
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
