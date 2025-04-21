import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";

interface ThemeState {
  theme: "light" | "dark";
  systemTheme: boolean; // true wenn System-Theme verwendet werden soll
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  setSystemTheme: (useSystem: boolean) => void;
  toggleSystemTheme: () => void;
  updateFromSystem: (systemTheme: ColorSchemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      systemTheme: true, 
      setTheme: (theme) => set({ theme, systemTheme: false }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
          systemTheme: false,
        })),
      setSystemTheme: (useSystem) => set({ systemTheme: useSystem }),
      toggleSystemTheme: () =>
        set((state) => ({
          systemTheme: !state.systemTheme,
          theme: state.systemTheme ? "light" : "dark",
        })),
      updateFromSystem: (systemTheme) =>
        set((state) => {
          if (state.systemTheme && systemTheme) {
            return { theme: systemTheme };
          }
          return state;
        }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
