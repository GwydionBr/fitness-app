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

// DB imports
import { seedDatabase } from "@/utils/seedDatabase";
import { db, DATABASE_NAME } from "@/db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  const { setSession, setLoading } = useAuthStore();
  const { fetchAllData } = useFitnessStore();
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchAllData();
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        fetchAllData();
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (success) {
      seedDatabase();
    }
  }, [success]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
      >
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }} />
      </SQLiteProvider>
    </ThemeProvider>
  );
}
