import { StyleSheet } from "react-native";
import ThemedSearchAndPickScreen, {
  Item,
} from "@/components/ui/ThemedSearchAndPickScreen";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";

const exercises: Item[] = [
  { id: "1", name: "Bench Press" },
  { id: "2", name: "Squats" },
  { id: "3", name: "Deadlift" },
  { id: "4", name: "Pull Ups" },
  { id: "5", name: "Push Ups" },
];

export default function AddTrainingExercise() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedSearchAndPickScreen
        onClose={() => {}}
        items={exercises}
        bottomSearchBar
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
