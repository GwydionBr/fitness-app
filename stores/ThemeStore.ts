import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorSchemeName } from "react-native";

interface ThemeState {
  theme: "light" | "dark";
  isSystemThemeActive: boolean; // true wenn System-Theme verwendet werden soll
  systemTheme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  setSystemTheme: (useSystem: boolean) => void;
  toggleSystemTheme: () => void;
  updateFromSystem: (systemTheme: ColorSchemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      isSystemThemeActive: true,
      systemTheme: "light",
      setTheme: (theme) => set({ theme, isSystemThemeActive: false }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
          isSystemThemeActive: false,
        })),
      setSystemTheme: (useSystem) => set({ isSystemThemeActive: useSystem }),
      toggleSystemTheme: () => {
        const { isSystemThemeActive, theme, systemTheme } = get();
        const newIsSystemThemeActive = !isSystemThemeActive;
        const newTheme = newIsSystemThemeActive ? systemTheme : theme;
        set({ isSystemThemeActive: newIsSystemThemeActive, theme: newTheme });
      },
      updateFromSystem: (systemTheme) => {
        const { isSystemThemeActive } = get();
        set(() => {
          if (isSystemThemeActive && systemTheme) {
            return { theme: systemTheme, systemTheme: systemTheme };
          } else if (!isSystemThemeActive && systemTheme) {
            return { systemTheme: systemTheme };
          }
          return {};
        });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
