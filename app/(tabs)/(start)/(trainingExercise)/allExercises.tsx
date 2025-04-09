import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useFitnessStore } from "@/stores/FitnessStore";
import { FlatList, StyleSheet } from "react-native";
import ExerciseRow from "@/components/Exercise/exerciseRow";

export default function AllExercises() {
  const { exercises } = useFitnessStore();
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => <ExerciseRow exercise={item} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
