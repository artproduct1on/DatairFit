import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { AuthFormInputs } from "../pages/AuthenticationPage/types";
import { SubmitHandler } from "react-hook-form";
import api from "../utils/api";
import { API_POST } from "../utils/constants";

export const useAuthSignIn = (isRegisterMode: boolean) => {
  const navigate = useNavigate();

  const {
    login,
    setLoading,
    setError,
  } = useAuthStore();

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

  return {
    isRegisterMode,
    onSubmit,
  };
};
