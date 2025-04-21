import { StyleSheet, Switch } from 'react-native'
import React from 'react'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { useThemeStore } from '@/stores/ThemeStore';
import ThemedButton from '@/components/ThemedButton';

const settings = () => {
  const { theme, toggleTheme, systemTheme, toggleSystemTheme } = useThemeStore();
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText>settings</ThemedText>
      <Switch
        value={theme === "dark"}
        onValueChange={toggleTheme}
        style={styles.switch}
      />
      <ThemedText>Current Theme: {theme}</ThemedText>
      <ThemedText>System Theme: {systemTheme ? "On" : "Off"}</ThemedText>
      <Switch
        value={systemTheme}
        onValueChange={toggleSystemTheme}
        style={styles.switch}
      />
      <Link href="/(tabs)/(settings)/account" style={styles.link}>Go to account</Link>
    </ThemedSafeAreaView>
  );
}

export default settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    color: '#fff',
    borderRadius: 5,
  },
  switch: {
    marginTop: 20,
    
  },
});
