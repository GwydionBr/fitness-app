import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Tables } from "@/types/db.types";

interface ExerciseRowProps {
  exercise: Tables<"exercise">;
  categories: string[];
}

export default function ExerciseRow({ exercise, categories }: ExerciseRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <ThemedText style={styles.text}>{exercise.title} </ThemedText>
        {
          exercise.information && (
            <ThemedText style={styles.text}>({exercise.information})</ThemedText>
          )
        }
      </View>
      <View style={styles.categories}>
        <ThemedText lightColor="gray" darkColor="gray" style={styles.categoryText}>{categories.join(", ")}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 20,
  },
  upperRow: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 12,
  },
});
