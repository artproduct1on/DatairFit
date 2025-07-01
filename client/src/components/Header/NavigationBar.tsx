import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useSettingsStore from "../../store/settingsStore";
import { Container, Typography } from "@mui/material";
import { pages } from "./helpers";

function NavigationBar() {
  const { lang } = useSettingsStore();

  return (
    <Container
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: "0 0 1rem rgba(0, 0, 0, 0.2) "
      }}
    >

      <Box
        sx={{
          position: { xs: "statik", md: "fixed" },
          zIndex: 1100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          top: { xs: 0, md: 3 },
          left: "50%",
          translate: { xs: 0, md: "-50%" },
          padding: 0,
        }}
      >
        {pages(lang).map(({ title, Icon, path }) => (
          <Button
            key={path}
            component={NavLink}
            to={path}
            sx={{
              display: "flex",
              gap: 0.5,
              textDecoration: "none",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", md: "auto" },
              flexDirection: { xs: "column", md: "row" },
              padding: { xs: 1.7, sm: 0.5, md: 1.2 },
            }}
          >
            <Icon
              sx={{
                fontSize: { xs: "x-large", md: "large" },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", sm: "flex" },
                translate: { xs: 0, md: "0 0.05rem" },
              }}
            >{title}</Typography>

          </Button >
        ))}
      </Box>
    </Container>
  );
}

export default NavigationBar;
