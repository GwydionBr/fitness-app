import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Tables } from "@/types/db.types";

interface ExerciseRowProps {
  exercise: Tables<"exercise">;
}

export default function ExerciseRow({ exercise }: ExerciseRowProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{exercise.title}</ThemedText>
      <ThemedText style={styles.text}>{exercise.information}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
  },
});
