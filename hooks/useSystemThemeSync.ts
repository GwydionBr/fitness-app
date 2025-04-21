import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useThemeStore } from "@/stores/ThemeStore";

export function useSystemThemeSync() {
  const systemColorScheme = useColorScheme();
  const updateFromSystem = useThemeStore((state) => state.updateFromSystem);

  useEffect(() => {
    updateFromSystem(systemColorScheme);
  }, [systemColorScheme]);
}
