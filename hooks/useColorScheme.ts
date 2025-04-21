import { useThemeStore } from "@/stores/ThemeStore";

export function useColorScheme() {
  const { theme } = useThemeStore();
  return theme;
}
