import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuthStore from "../../store/authStore";

// MUI Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

import api from "../../utils/api";
import { AuthFormInputs } from "./types";
import { loginSchema, registerSchema } from "./helpers";
import { API_POST } from "../../utils/constants";

export default function AuthenticationPage() {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const {
    login,
    isLoading,
    setLoading,
    error,
    setError,
  } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
        await api.post(API_POST.REGISTER, { name: data.name, email: data.email, password: data.password }) :
        await api.post(API_POST.LOGIN, { email: data.email, password: data.password });

      const { token, user } = response.data;
      login(token, user);

      navigate("/");
    } catch (err: any) {
      setError("Authentication failed. Please try again.");
      console.error("Authentication error:", err);
    } finally {
      setLoading(false);
    };
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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
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
          <Link
            component="button"
            onClick={toggleMode}
            sx={{
              cursor: "pointer",
              ml: 0.5,
            }}
          >
            {isRegisterMode ? "Log In" : "Register"}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};
