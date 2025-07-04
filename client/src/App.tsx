import { CircularProgress, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import useSettingsStore from "./store/settingsStore";
import Header from "./components/Header";
import NavigationBar from "./components/Header/NavigationBar";
import ThemeSettings from "./utils/ThemeSettings";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AuthenticationPage = lazy(() => import("./pages/AuthenticationPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const { theme } = useSettingsStore();

  return (
    <ThemeProvider theme={ThemeSettings(theme)}>
      <CssBaseline />
      <Header />
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/" index element={<DashboardPage />} />
          <Route path="/authentication" index element={<AuthenticationPage />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/exercises" element={<Typography variant="h1">Exercises</Typography>} />
          <Route path="/exercises/:id" element={<Typography variant="h1">Exercise Details</Typography>} />

        </Routes>
      </Suspense>
      <NavigationBar />
    </ThemeProvider>
  );
}

export default App;
