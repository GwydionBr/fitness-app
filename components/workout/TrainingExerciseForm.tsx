import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { StyleSheet, View } from "react-native";
import { WorkoutExercise } from "@/stores/FitnessStore";
import { useThemeColor } from "@/hooks/useThemeColor";
import TrainingSetRow from "./TrainingSetRow";
import { TablesInsert } from "@/types/db.types";
import IconButton from "../ui/IconButton";
import { SwipeListView } from "react-native-swipe-list-view";
import DeleteSwipeRow from "../ui/DeleteSwipeRow";
import { useState } from "react";

interface TrainingExerciseFormProps {
  workoutExercise: WorkoutExercise;
  isEditing: boolean;
  onSetChange: (set: TablesInsert<"training_set">, setIndex: number) => void;
  onAddSet: () => void;
  onDeleteSet: (setIndex: number) => void;
  onDeleteExercise: () => void;
}

export default function TrainingExerciseForm({
  workoutExercise,
  isEditing,
  onSetChange,
  onAddSet,
  onDeleteSet,
  onDeleteExercise,
}: TrainingExerciseFormProps) {
  const { trainingExercise: exercise, sets } = workoutExercise;
  const shadowColor = useThemeColor({}, "shadow");
  const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <ThemedView style={[styles.container, { shadowColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ThemedText style={styles.title}>{exercise.title}</ThemedText>
          {exercise.information && (
            <ThemedText style={styles.subtitle}>
              ({exercise.information})
            </ThemedText>
          )}
        </View>
        {isEditing && (
          <IconButton
            icon="trash"
            size={18}
            color="red"
            onPress={onDeleteExercise}
          />
        )}
      </View>
      <View style={styles.tableHeader}>
        <ThemedText style={styles.tableHeaderText}>Set</ThemedText>
        <ThemedText style={styles.tableHeaderText}>Reps</ThemedText>
        <ThemedText style={styles.tableHeaderText}>Weight</ThemedText>
      </View>
      <SwipeListView
        data={sets}
        rightOpenValue={-75}
        stopRightSwipe={-100}
        closeOnRowBeginSwipe={true}
        // closeOnScroll={true}
        disableLeftSwipe={!isEditing}
        disableRightSwipe
        keyExtractor={(item, index) => `set-${index}`}
        renderItem={({ item, index }) => (
          <TrainingSetRow
            isEditing={isEditing}
            className=""
            key={`set-row-${index}`}
            index={index}
            reps={item.repetitions ?? 0}
            weight={item.weight ?? 0}
            onRepsChange={(reps) =>
              onSetChange({ ...item, repetitions: reps }, index)
            }
            onWeightChange={(weight) => onSetChange({ ...item, weight }, index)}
          />
        )}
        renderHiddenItem={({ index }) => (
          <DeleteSwipeRow
            className=" "
            onDelete={() => onDeleteSet(index)}
            size={20}
          />
        )}
        swipeToOpenPercent={1}
      />
      {isEditing && (
        <View style={styles.addSetRow}>
          <IconButton
            icon="plus"
            size={18}
            color="white"
            onPress={onAddSet}
            buttonStyle={styles.addSetButton}
          />
        </View>
      )}
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
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
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
    justifyContent: "space-between",
    paddingBottom: 6,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  rowFront: {
    backgroundColor: "transparent",
  },
  trainingSetRow: {
    marginTop: 5,
  },
});
