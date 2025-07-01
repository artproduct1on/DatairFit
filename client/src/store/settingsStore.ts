import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SettingsStore } from "./types";
import { LOCAL_STORAGE } from "../utils/constants";

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

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: "system",
      lang: getInitialLang(),
      setTheme: (newTheme: string) => set({ theme: newTheme }),
      setLang: (newLang) => set({ lang: newLang })
    }),
    {
      name: LOCAL_STORAGE.SETTINGS,
      partialize: (state) => ({
        theme: state.theme,
        lang: state.lang
      }),
    }
  )
);

const subscribe = useSettingsStore.subscribe(console.log);
subscribe();

export default useSettingsStore;

