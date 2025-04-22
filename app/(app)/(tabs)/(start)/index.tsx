import { View } from "react-native";
import { useRouter } from "expo-router";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";
import ThemedButton from "@/components/ui/ThemedButton";

export default function StartScreen() {
  const router = useRouter();
  return (
    <ThemedSafeAreaView className="flex-1">
      <View className="flex-1 justify-center gap-8 px-20">
        <ThemedButton onPress={() => router.push("/categoryScreen")}>
          Category Screen
        </ThemedButton>
        <ThemedButton
          type="warning"
          onPress={() => router.push("/allExercises")}
        >
          Training Exercise
        </ThemedButton>
        <ThemedButton
          type="success"
          onPress={() => router.push("/allNewExercises")}
        >
          All New Exercises
        </ThemedButton>
      </View>
    </ThemedSafeAreaView>
  );
}
