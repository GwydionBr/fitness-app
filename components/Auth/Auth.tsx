import React from "react";
import { Platform, StyleSheet, TouchableOpacity, Text } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { supabase } from "@/utils/supabase";
import { SignInWithAppleButton } from "./SignInWithAppleButton";
import { ThemedView } from "../ThemedView";

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

export default function Auth() {
  // Handle linking into app from email app.
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  return (
    <ThemedView style={styles.container}>
      {Platform.OS === "ios" && <SignInWithAppleButton />}
      <TouchableOpacity style={styles.githubButton} onPress={performOAuth}>
        <Text style={styles.githubButtonText}>Sign in with GitHub</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  githubButton: {
    width: 200,
    height: 64,
    backgroundColor: "#24292e",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  githubButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
