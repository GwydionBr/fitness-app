import { AppState, StyleSheet, View } from "react-native";
import { supabase } from "@/utils/supabase";
import EmailForm from "@/components/Auth/EmailForm";
import Auth from "@/components/Auth/Auth";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function AuthScreen() {
  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <EmailForm />
        <Auth />
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    justifyContent: "center",
  },
});
