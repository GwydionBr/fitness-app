import { StyleSheet, Switch, View } from "react-native";
import React from "react";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { useThemeStore } from "@/stores/ThemeStore";
import IconButton from "@/components/ui/IconButton";

const settings = () => {
  const {
    theme,
    systemTheme,
    toggleTheme,
    isSystemThemeActive,
    toggleSystemTheme,
    setTheme,
  } = useThemeStore();
  return (
    <ThemedSafeAreaView className="pt-10">
      <View className="flex-row items-center justify-around">
        <View className="items-center justify-between gap-2">
          <ThemedText>Use System Theme</ThemedText>
          <IconButton
            icon={systemTheme === "light" ? "sun.min" : "moon"}
            size={24}
            color={systemTheme === "light" ? "black" : "white"}
            className={`p-3 mt-2 rounded-xl ${
              isSystemThemeActive ? "border-2 border-red-500" : ""
            } ${systemTheme === "light" ? "bg-yellow-400" : "bg-blue-900"}`}
            onPress={toggleSystemTheme}
            withBorder
          />
        </View>
        <View className="items-center justify-between gap-2">
          <ThemedText>Use fixed Theme</ThemedText>
          <View className="flex-row items-center justify-between gap-2">
            <IconButton
              icon={"sun.min"}
              size={24}
              color={"black"}
              className={`p-3 mt-2 bg-yellow-400 ${
                theme === "light" && !isSystemThemeActive ? "border-2 border-red-500" : ""
              }`}
              onPress={() => setTheme("light")}
              withBorder
            />
            <IconButton
              icon={"moon"}
              size={24}
              color={"white"}
              className={`p-3 mt-2 bg-blue-900 ${
                theme === "dark" && !isSystemThemeActive
                  ? "border-2 border-red-500"
                  : ""
              }`}
              onPress={() => setTheme("dark")}
              withBorder
            />
          </View>
        </View>
      </View>
      <Link href="/(tabs)/(settings)/account" style={styles.link}>
        Go to account
      </Link>
    </ThemedSafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    color: "#fff",
    borderRadius: 5,
    textAlign: "center",
  },
});
