import React, { useState } from "react";
import { StyleSheet, Pressable, ViewStyle, StyleProp } from "react-native";
import { ThemedText } from "../ThemedText";
import ThemedNumberInput from "../ThemedNumberInput";
import { ThemedView } from "../ThemedView";
import { useThemeStore } from "@/stores/ThemeStore";
interface TrainingSetRowProps {
  index: number;
  reps: number;
  weight: number;
  isEditing: boolean;
  onRepsChange?: (reps: number) => void;
  onWeightChange?: (weight: number) => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export default function TrainingSetRow({
  index,
  reps,
  weight,
  isEditing,
  onRepsChange,
  onWeightChange,
  style,
  className,
}: TrainingSetRowProps) {
  const { theme } = useThemeStore();
  const [isEditingReps, setIsEditingReps] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);

  return (
    <ThemedView
      className={`flex-row justify-between border-2 rounded-lg shadow-lg ${
        theme === "dark"
          ? "shadow-gray-800 border-gray-600"
          : "shadow-gray-100 border-gray-300"
      } ${className}`}
    >
      <ThemedText style={styles.index}>{index + 1}</ThemedText>
      {isEditing && isEditingReps ? (
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
      {isEditing && isEditingWeight ? (
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
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
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
