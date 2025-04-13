import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ExerciseForm from "@/components/Exercise/exerciseForm";

export default function AddExercise() {
  return (
    <View style={styles.container}>
      <ThemedText>Add Exercise</ThemedText>
      <ExerciseForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});