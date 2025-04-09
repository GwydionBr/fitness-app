import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function StartScreen() {
  return (
    <ThemedSafeAreaView>
      <ThemedText>Start</ThemedText>
      <Link href="/categoryScreen">
        <ThemedText>Category Screen</ThemedText>
      </Link>
    </ThemedSafeAreaView>
  );
}