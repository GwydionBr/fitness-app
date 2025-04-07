import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components"
import { default as theme} from "@/custom-theme.json";

import "react-native-reanimated";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { supabase } from "@/utils/supabase";
import { useAuthStore } from "@/stores/AuthStore";
import { useFitnessStore } from "@/stores/FitnessStore";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { session, isLoading, setSession, setLoading } = useAuthStore();
  const { fetchAllData } = useFitnessStore();

  const colorScheme = useColorScheme() || "light";

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      fetchAllData();
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      fetchAllData();
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
      if (session) {
        router.replace("/workout");
      } else {
        router.replace("/auth");
      }
    }
  }, [fontsLoaded, isLoading, session]);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva[colorScheme], ...theme }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ApplicationProvider>
  );
}
