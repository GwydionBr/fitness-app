import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";

export default function StartScreen() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <Link href="/categoryScreen" style={styles.link}>
        <ThemedText>Category Screen</ThemedText>
      </Link>
      <Link href="/allExercises" style={styles.link}>
        <ThemedText>Training Exercise</ThemedText>
      </Link>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginTop: 20,
  },
});