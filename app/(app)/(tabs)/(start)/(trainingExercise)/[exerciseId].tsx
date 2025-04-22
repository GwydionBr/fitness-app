import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import ExerciseForm from "@/components/Exercise/exerciseForm";

import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useFitnessStore } from "@/stores/FitnessStore";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";

export default function EditExercise() {
  const { exerciseId } = useLocalSearchParams();
  const { exercises } = useFitnessStore();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const exercise = exercises.find((exercise) => exercise.id === exerciseId);
    navigation.setOptions({
      title: exercise?.title + " - Edit",
    });
  }, [navigation, exercises, exerciseId]);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ExerciseForm
        existingExercise={exercises.find(
          (exercise) => exercise.id === exerciseId
        )}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
