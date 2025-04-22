import "@/global.css";

import "react-native-reanimated";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { supabase } from "@/utils/supabase";
import { useAuthStore } from "@/stores/AuthStore";
import { useFitnessStore } from "@/stores/FitnessStore";
import { useThemeStore } from "@/stores/ThemeStore";
import { useSystemThemeSync } from "@/hooks/useSystemThemeSync";
// DB imports
import { seedDatabase } from "@/utils/seedDatabase";
import { db, DATABASE_NAME } from "@/db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  const { setSession, setLoading } = useAuthStore();
  const { fetchAllData } = useFitnessStore();
  const { theme } = useThemeStore();

  // Hook zum Synchronisieren des System-Themes
  useSystemThemeSync();

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        await fetchAllData();
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await fetchAllData();
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
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Slot/>
    </SQLiteProvider>
  );
}
