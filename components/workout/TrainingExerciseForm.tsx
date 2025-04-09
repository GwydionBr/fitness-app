import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { StyleSheet, View } from "react-native";
import { WorkoutExercise } from "@/app/(tabs)/(workout)/workout";
import { FlatList } from "react-native";
import SetRow from "./SetRow";
import { useThemeColor } from "@/hooks/useThemeColor";

interface TrainingExerciseFormProps {
  workoutExercise: WorkoutExercise;
}

export default function TrainingExerciseForm({
  workoutExercise,
}: TrainingExerciseFormProps) {
  const { trainingExercise: exercise, sets } = workoutExercise;
  const shadowColor = useThemeColor({}, "shadow");

  return (
    <ThemedView style={[styles.container, { shadowColor }]}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>{exercise.title}</ThemedText>
        {exercise.information && (
          <ThemedText style={styles.subtitle}>
            ({exercise.information})
          </ThemedText>
        )}
      </View>
      <View style={styles.tableHeader}>
        <ThemedText style={styles.tableHeaderText}>Set</ThemedText>
        <ThemedText style={styles.tableHeaderText}>Reps</ThemedText>
        <ThemedText style={styles.tableHeaderText}>Weight</ThemedText>
      </View>
      <FlatList
        data={sets}
        renderItem={({ item, index }) => <SetRow set={item} setIndex={index} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "gray",
    width: 300,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  subtitle: {
    fontSize: 12,
  },
});
