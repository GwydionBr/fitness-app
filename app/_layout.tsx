import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import "react-native-reanimated";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useRouter, useSegments } from "expo-router";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { supabase } from "@/utils/supabase";
import { useAuthStore } from "@/stores/AuthStore";
import { useFitnessStore } from "@/stores/FitnessStore";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const { session, isLoading, setSession, setLoading } = useAuthStore();
  const { fetchAllData } = useFitnessStore();
  const [isRouteReady, setIsRouteReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  const colorScheme = useColorScheme() || "light";

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      await fetchAllData();
      setLoading(false);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      await fetchAllData();
      setLoading(false);
    });
  }, []);

  // Handle initial routing
  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      if (session) {
        router.replace("/start");
      } else {
        router.replace("/auth");
      }
    }
  }, [fontsLoaded, isLoading, session]);

  // Handle splash screen hiding after route is ready
  useEffect(() => {
    if (segments.length > 0) {
      setIsRouteReady(true);
    }
  }, [segments]);

  // Hide splash screen when everything is ready
  useEffect(() => {
    if (isRouteReady && fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isRouteReady, fontsLoaded, isLoading]);

  // Prevent rendering of index page by returning null until routing is complete
  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
