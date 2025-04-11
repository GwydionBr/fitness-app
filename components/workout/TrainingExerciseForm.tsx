import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { StyleSheet, View } from "react-native";
import { WorkoutExercise } from "@/app/(tabs)/(workout)/workout";
import { FlatList } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import TrainingSetRow from "./TrainingSetRow";
import { TablesInsert } from "@/types/db.types";
import IconButton from "../ui/IconButton";

interface TrainingExerciseFormProps {
  workoutExercise: WorkoutExercise;
  workoutIndex: number;
  onSetChange: (set: TablesInsert<"training_set">, setIndex: number) => void;
  addSet: () => void;
}

export default function TrainingExerciseForm({
  workoutExercise,
  onSetChange,
  addSet,
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
        renderItem={({ item, index }) => (
          <TrainingSetRow
            index={index}
            reps={item.repetitions ?? 0}
            weight={item.weight ?? 0}
            onRepsChange={(reps) =>
              onSetChange({ ...item, repetitions: reps }, index)
            }
            onWeightChange={(weight) => onSetChange({ ...item, weight }, index)}
          />
        )}
      />
      <View style={styles.addSetRow}>
        <IconButton icon="plus" size={18} color="white" onPress={addSet} buttonStyle={styles.addSetButton}/>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 10,
    paddingHorizontal: 16,
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
    width: 50,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    paddingBottom: 6,
  },
  subtitle: {
    fontSize: 12,
  },
  addSetRow: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  addSetButton: {
    backgroundColor: "green",
    borderRadius: 100,

  },
});
