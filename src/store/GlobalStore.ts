import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalStore {
  theme: string;
}


const useGlobalStore = create()(
  persist(
    (set) => ({
      theme: "system",
    }),
    {
      name: "global",
      partialize: (state) => ({
        theme: state.theme
      }),
    }
  )
);

const sub = useGlobalStore.subscribe(console.log);
sub();

export default useGlobalStore;
