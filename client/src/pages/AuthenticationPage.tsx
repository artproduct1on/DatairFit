import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuthStore from "../store/authStore";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

import api from "../utils/api";

interface AuthFormInputs {
  name?: string;
  email: string;
  password: string;
}

export default function AuthenticationPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const isLoading = useAuthStore((state) => state.isLoading);
  const authError = useAuthStore((state) => state.error);

  // Validation schemas for Yup
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid Email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Used to clear the form
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(isRegisterMode ? registerSchema : loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = isRegisterMode ?
        await api.post("/auth/register", { name: data.name, email: data.email, password: data.password }) :
        await api.post("/auth/login", { email: data.email, password: data.password });

      const { token, user } = response.data;
      login(token, user);

      navigate("/");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Authentication failed. Please try again.";
      setError(errorMessage);
      console.error("Authentication error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode((prevMode) => !prevMode);
    reset({ name: "", email: "", password: "" });
    setError(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" component="h1" gutterBottom textAlign="center">
          {isRegisterMode ? "Register" : "Log In"}
        </Typography>

        {authError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {authError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {isRegisterMode && (
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : (isRegisterMode ? "Register" : "Log In")}
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          {isRegisterMode ? "Already have an account?" : "Don't have an account?"}
          {" "}
          <Link component="button" onClick={toggleMode} sx={{ cursor: "pointer" }}>
            {isRegisterMode ? "Log In" : "Register"}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};
