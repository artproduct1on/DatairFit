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
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState<Element | null>(null);
  const handleOpenUserMenu = (e: MouseEvent) => setAnchorElUser(e.currentTarget);
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "background.paper" }}
    >
      <Container
        maxWidth="xl"
        sx={{
          gap: 2,
          display: "flex",
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
            sx={{ color: "text.primary", }}
          >
            DFit
          </Typography>
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            size="small"
            type="button"
            aria-label="Points for Activity"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "background.default",
            }}
          >
            <Typography>0</Typography>
            <BoltOutlinedIcon sx={{ color: "yellow" }} />

          </Button>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            onClick={handleOpenUserMenu}
          >
            <AccountCircleIcon />
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
