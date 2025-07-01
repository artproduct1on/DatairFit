import { useState } from "react";
import { useForm, } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
// Custom
import useSettingsStore from "../../store/settingsStore.ts";
import useAuthStore from "../../store/authStore";
import { AuthFormInputs } from "./types";
import { loginSchema, registerSchema } from "./helpers";
import { useAuthSignIn } from "../../hooks/useAuth";
import t from "./translate.json";

export default function AuthenticationPage() {

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const { lang } = useSettingsStore();

  const {
    isLoading,
    error,
    setError,
  } = useAuthStore();

  const { onSubmit } = useAuthSignIn(isRegisterMode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(isRegisterMode ? registerSchema(lang) : loginSchema(lang)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

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
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          textAlign="center"
        >
          {isRegisterMode ? t[lang].register : t[lang].login}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {isRegisterMode && (
            <TextField
              label={t[lang].name}
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
          <TextField
            label={t[lang].email}
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label={t[lang].password}
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
            {
              isLoading ?
                <CircularProgress size={24} color="inherit" /> :
                (isRegisterMode ? t[lang].signUp : t[lang].signIn)
            }
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          {isRegisterMode ? t[lang].alreadyHaveAccount : t[lang].noAccount}
          <Link
            component="button"
            onClick={toggleMode}
            sx={{
              cursor: "pointer",
              ml: 0.5,
            }}
          >
            {isRegisterMode ? t[lang].login : t[lang].register}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};
