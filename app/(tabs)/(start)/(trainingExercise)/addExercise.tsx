import { View, StyleSheet } from "react-native";
import ExerciseForm from "@/components/Exercise/exerciseForm";

export default function AddExercise() {
  return (
    <View style={styles.container}>
      <ExerciseForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});