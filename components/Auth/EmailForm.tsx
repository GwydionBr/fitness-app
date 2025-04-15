import React, { useState } from "react";
import { Alert, StyleSheet, View, Button, Pressable } from "react-native";
import { supabase } from "@/utils/supabase";
import ThemedTextInput from "../ThemedTextInput";
import PasswordInput from "./PasswordInput";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");

  const shadowColor = useThemeColor({}, "shadow");
  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");

  const toggleMode = () => {
    setMode(mode === "signIn" ? "signUp" : "signIn");
    setConfirmPassword(""); // Reset confirm password when switching modes
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <ThemedTextInput
          withBorder
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <PasswordInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      {mode === "signUp" && (
        <View style={styles.verticallySpaced}>
          <PasswordInput
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Confirm Password"
            autoCapitalize={"none"}
          />
        </View>
      )}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        {mode === "signIn" ? (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { shadowColor: shadowColor, backgroundColor: primaryColor },
              pressed && styles.pressed,
            ]}
            disabled={loading}
            onPress={() => signInWithEmail()}
          >
            <ThemedText style={styles.buttonText}>{"Sign in"}</ThemedText>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { shadowColor: shadowColor, backgroundColor: secondaryColor },
              pressed && styles.pressed,
            ]}
            disabled={loading}
            onPress={() => signUpWithEmail()}
          >
            <ThemedText style={styles.buttonText}>{"Sign up"}</ThemedText>
          </Pressable>
        )}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.toggleButton,
          pressed && styles.pressed,
        ]}
        onPress={toggleMode}
        disabled={loading}
      >
        <ThemedText style={styles.modeTogglerText}>
          {mode === "signIn"
            ? "create an Account"
            : "already have an account? Sign in"}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleButton: {
    padding: 12,
  },
  modeTogglerText: {
    textAlign: "center",
    fontSize: 16,
    color: "grey",
  },
  pressed: {
    opacity: 0.75,
  },
});
