import { Typography } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/exercises" element={<Typography variant="h1">Exercises</Typography>} />
        <Route path="/exercises/:id" element={<Typography variant="h1">Exercise Details</Typography>} />

      </Routes>
    </Suspense>
  );
}

export default App;
