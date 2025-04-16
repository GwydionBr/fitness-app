import { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Tables, TablesInsert } from "@/types/db.types";
import { useFitnessStore } from "@/stores/FitnessStore";
import ThemedMultipleSelect from "@/components/ThemedMultipleSelect";
import ThemedTextInput from "../ThemedTextInput";

import { useRouter } from "expo-router";
import ThemedButton from "../ThemedButton";

interface ExerciseFormProps {
  existingExercise?: Tables<"exercise">;
}

export default function ExerciseForm({ existingExercise }: ExerciseFormProps) {
  const { categories, getCategoriesByExerciseId, createExercise, updateExercise } = useFitnessStore();
  const router = useRouter();
  const [exercise, setExercise] = useState<TablesInsert<"exercise">>({
    title: "",
    information: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (existingExercise) {
      setExercise(existingExercise);
      const exerciseCategories = getCategoriesByExerciseId(existingExercise.id);
      setSelectedCategories(exerciseCategories.map((category) => category.id));
    } else {
      setExercise({
        title: "",
        information: "",
      });
      setSelectedCategories([]);
    }
  }, [existingExercise]);

  const handleSubmit = () => {
    if (existingExercise) {
      updateExercise(existingExercise.id, exercise, selectedCategories);
    } else {
      createExercise(exercise, selectedCategories);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <ThemedTextInput
        label="Title"
        withBorder
        value={exercise?.title}
        onChangeText={(text) => setExercise({ ...exercise, title: text })}
      />
      <ThemedTextInput
        label="Information"
        withBorder
        autoCapitalize="none"
        value={exercise?.information || ""}
        onChangeText={(text) => setExercise({ ...exercise, information: text })}
      />
      <ThemedMultipleSelect
        selectedItems={selectedCategories}
        onSelectedItemsChange={setSelectedCategories}
        items={categories.map((category) => ({
          id: category.id,
          name: category.title,
        }))}
        label="Categories"
        withBorder
      />
      <View style={styles.buttonContainer}>
        <ThemedButton type="primary" onPress={handleSubmit}>Submit</ThemedButton>
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
