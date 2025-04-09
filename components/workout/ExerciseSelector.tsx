import React, { useState } from "react";
import { View, StyleSheet, Button, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Tables } from "@/types/db.types";
import { useFitnessStore } from "@/stores/FitnessStore";

interface ExerciseSelectorProps {
  categoryId: string;
  onExerciseSelect: (exercise: Tables<"exercise">) => void;
}

const ExerciseSelector = ({ categoryId, onExerciseSelect }: ExerciseSelectorProps) => {
  const { exercises, exerciseCategories } = useFitnessStore();
  
  // Filter exercises by category
  const categoryExercises = exercises.filter((exercise) =>
    exerciseCategories.some(
      (ec) => ec.exercise_id === exercise.id && ec.category_id === categoryId
    )
  );

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Select Exercise</ThemedText>
      <FlatList
        data={categoryExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <ThemedText style={styles.exerciseTitle}>{item.title}</ThemedText>
            <Button title="Add" onPress={() => onExerciseSelect(item)} />
          </View>
        )}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            No exercises found for this category
          </ThemedText>
        }
      />
    </View>
  );
};

export default ExerciseSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  exerciseTitle: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
}); 