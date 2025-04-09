import { ThemedView } from "@/components/ThemedView";
import { useFitnessStore } from "@/stores/FitnessStore";
import { FlatList, StyleSheet } from "react-native";
import ExerciseRow from "@/components/Exercise/exerciseRow";

export default function AllExercises() {
  const { exercises, categories, exerciseCategories } = useFitnessStore();

  function getExerciseCategories(exerciseId: string) {
    return exerciseCategories
      .filter(({ exercise_id }) => exercise_id === exerciseId)
      .map(
        ({ category_id }) =>
          categories.find(({ id }) => id === category_id)?.title ?? ""
      )
      .filter((title) => title !== "");
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseRow
            exercise={item}
            categories={getExerciseCategories(item.id)}
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
