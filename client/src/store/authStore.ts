import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "../utils/api";
import { API_GET, LOCAL_STORAGE } from "../utils/constants";
import { AuthStore, StateStore } from "./types";

const defaultState: StateStore = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...defaultState,
      login: (token, user) => {
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set(defaultState);
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (errorMessage: string | null) => set({ error: errorMessage }),

      checkAuth: async () => {
        const currentToken = get().token;

        if (!currentToken) return set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        });

        set({
          isLoading: true,
          error: null,
        });

        try {
          const response = await api.get(API_GET.ME);
          const { user } = response.data;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (err: any) {
          console.error("Failed to re-authenticate or fetch user data:", err);
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: "Session expired or invalid. Please log in again.",
          });
        }
      },
    }),
    {
      name: LOCAL_STORAGE.AUTH,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
