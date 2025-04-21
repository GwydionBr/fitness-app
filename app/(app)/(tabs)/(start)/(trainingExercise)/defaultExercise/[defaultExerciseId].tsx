import { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ExerciseForm from "@/components/Exercise/exerciseForm";

import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { db } from '@/db';
import { Exercise, exercises } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ThemedText } from "@/components/ThemedText";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";

export default function EditExercise() {
  const { defaultExerciseId } = useLocalSearchParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    async function fetchExercise() {
      const selectedExercise = await db.select().from(exercises).where(eq(exercises.id, defaultExerciseId as string));
      setExercise(selectedExercise[0]);
      navigation.setOptions({
        title: selectedExercise[0].name,
      });
    }
    fetchExercise();
  }, [navigation, exercise, defaultExerciseId]);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText>{exercise?.name}</ThemedText>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
