import React, { useState } from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Tables } from "@/types/db.types";
import { useFitnessStore } from "@/stores/FitnessStore";

interface ExerciseSetsProps {
  exercise: Tables<"exercise">;
  trainingSessionId: string;
  onSetAdded: () => void;
}

const ExerciseSets = ({ exercise, trainingSessionId, onSetAdded }: ExerciseSetsProps) => {
  const { createTrainingSet } = useFitnessStore();
  const [repetitions, setRepetitions] = useState("");

  const handleAddSet = async () => {
    if (!repetitions || isNaN(Number(repetitions))) {
      return;
    }

    await createTrainingSet({
      exercise_id: exercise.id,
      training_session_id: trainingSessionId,
      repetitions: Number(repetitions),
    });

    setRepetitions("");
    onSetAdded();
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.exerciseTitle}>{exercise.title}</ThemedText>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={repetitions}
          onChangeText={setRepetitions}
          placeholder="Number of repetitions"
          keyboardType="numeric"
        />
        <Button title="Add Set" onPress={handleAddSet} />
      </View>
    </View>
  );
};

export default ExerciseSets;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
}); 