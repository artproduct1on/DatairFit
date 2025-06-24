import { ThemeProvider, Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import useGlobalStore from "./store/globalStore";
import Header from "./components/Header";
import NavigationBar from "./components/Header/NavigationBar";
import ThemeSettings from "./utils/ThemeSettings";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { theme } = useGlobalStore((state) => state);

  return (
    <ThemeProvider theme={ThemeSettings(theme)}>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" index element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/exercises" element={<Typography variant="h1">Exercises</Typography>} />
          <Route path="/exercises/:id" element={<Typography variant="h1">Exercise Details</Typography>} />

        </Routes>
      </Suspense>
      <NavigationBar />
    </ThemeProvider>
  );
}

export default App;
