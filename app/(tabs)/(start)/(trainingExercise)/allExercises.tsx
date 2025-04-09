import { ThemedView } from "@/components/ThemedView";
import { useFitnessStore } from "@/stores/FitnessStore";
import { FlatList, StyleSheet } from "react-native";
import ExerciseRow from "@/components/Exercise/exerciseRow";

export default function AllExercises() {
  const { exercises, getCategoriesByExerciseId } = useFitnessStore();


  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseRow
            exercise={item}
            categories={getCategoriesByExerciseId(item.id)}
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
