export type LangType = string;

export interface SettingsStore {
  theme: string;
  lang: LangType;
  setTheme: (theme: string) => void;
  setLang: (lang: string) => void;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  savedTrainings?: any[];
};

export interface StateStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export interface AuthStore extends StateStore {
  login: (token: string, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  checkAuth: () => Promise<void>;
};
