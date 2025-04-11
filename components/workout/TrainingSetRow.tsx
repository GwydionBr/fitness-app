import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import ThemedNumberInput from "../ThemedNumberInput";
import { ThemedView } from "../ThemedView";

interface TrainingSetRowProps {
  index: number;
  reps: number;
  weight: number;
  onRepsChange?: (reps: number) => void;
  onWeightChange?: (weight: number) => void;
}

export default function TrainingSetRow({
  index,
  reps,
  weight,
  onRepsChange,
  onWeightChange,
}: TrainingSetRowProps) {
  const [isEditingReps, setIsEditingReps] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.index}>{index + 1}</ThemedText>
      {isEditingReps ? (
        <ThemedNumberInput
          autoFocus
          value={reps.toString()}
          onNumberChange={onRepsChange}
          onEndEditing={() => setIsEditingReps(false)}
          style={styles.input}
        />
      ) : (
        <Pressable onPress={() => setIsEditingReps(true)}>
          <ThemedText style={styles.reps}>{reps}</ThemedText>
        </Pressable>
      )}
      {isEditingWeight ? (
        <ThemedNumberInput
          autoFocus
          value={weight.toString()}
          onNumberChange={onWeightChange}
          onEndEditing={() => setIsEditingWeight(false)}
          style={styles.input}
        />
      ) : (
        <Pressable onPress={() => setIsEditingWeight(true)}>
          <ThemedText style={styles.weight}>{weight}</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 5,
  },
  index: {
    width: 50,
    textAlign: "center",
    paddingVertical: 5,
  },
  reps: {
    width: 50,
    textAlign: "center",
    paddingVertical: 5,
  },
  weight: {
    width: 50,
    textAlign: "center",
    paddingVertical: 5,
  },
  input: {
    width: 50,
    textAlign: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
