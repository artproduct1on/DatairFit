import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalStore {
  theme: string;
  lang: string;
  setTheme: (theme: string) => void;
  setLang: (lang: string) => void;
}

const getInitialLang = (): string => {
  const browserLang = navigator.language.split("-")[0];

  switch (browserLang) {
    case "uk":
      return "uk";
    case "de":
      return "de";
    case "en":
    default:
      return "en";
  }
};

const useGlobalStore = create<GlobalStore>()(
  persist(
    (set) => ({
      theme: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      lang: getInitialLang(),
      setTheme: (newTheme: string) => set({ theme: newTheme }),
      setLang: (newLang) => set({ lang: newLang })
    }),
    {
      name: "global",
      partialize: (state) => ({
        theme: state.theme
      }),
    }
  )
);

const subscribe = useGlobalStore.subscribe(console.log);
subscribe();

export default useGlobalStore;

