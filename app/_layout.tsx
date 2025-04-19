import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import "react-native-reanimated";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { supabase } from "@/utils/supabase";
import { useAuthStore } from "@/stores/AuthStore";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFitnessStore } from "@/stores/FitnessStore";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const { setSession, setLoading } = useAuthStore();
  const { fetchAllData } = useFitnessStore();
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        await fetchAllData();
        router.push("/");
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await fetchAllData();
        router.push("/");
      }
      setLoading(false);
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
