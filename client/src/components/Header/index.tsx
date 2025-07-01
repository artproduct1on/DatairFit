import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
// ui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HeaderMenu from "./HeaderMenu";
import useAuthStore from "../../store/authStore";

export default function Header() {

  const { isAuthenticated, user } = useAuthStore();

  const [anchorElUser, setAnchorElUser] = useState<Element | null>(null);
  const handleOpenUserMenu = (e: MouseEvent) => setAnchorElUser(e.currentTarget);
  const getInitial = (name: string | undefined): string => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.paper",
        height: 45,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          gap: 2,
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >

        <Button
          component={Link}
          to="/"
          size="large"
          type="button"
          aria-label="account of current user"
          sx={{
            gap: 0.5,
            display: "flex",
            alignItems: "center",
            p: 0.5,
          }}
        >
          <Avatar
            sx={{ width: 25, height: 25 }}
            variant='rounded'
            src="/logo.png"
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              color: "text.primary",
              textTransform: "none",
            }}
          >
            D-Fitness
          </Typography>
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            onClick={handleOpenUserMenu}
            sx={{ width: 30, height: 30 }}
          >
            {isAuthenticated && user?.name ? (
              <Avatar sx={{ width: 30, height: 30 }}>
                {getInitial(user.name)}
              </Avatar>
            ) : (
              <AccountCircleIcon sx={{ fontSize: 30, color: "inherit" }} />
            )}
          </IconButton>
        </Box>

      </Container>

      <HeaderMenu
        anchorElUser={anchorElUser}
        setAnchorElUser={setAnchorElUser}
      />

    </AppBar >
  );
}
