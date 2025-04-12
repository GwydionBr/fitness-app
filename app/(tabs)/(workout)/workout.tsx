import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList, View, Alert, Button } from "react-native";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import WorkoutTimer from "@/components/workout/WorkoutTimer";
import SelectTrainingCategory from "@/components/workout/SelectTrainingCategory";
import { useFitnessStore } from "@/stores/FitnessStore";
import { Tables, TablesInsert } from "@/types/db.types";
import { useNavigation } from "expo-router";
import TrainingExerciseForm from "@/components/workout/TrainingExerciseForm";

export interface WorkoutExercise {
  trainingExercise: TablesInsert<"training_exercise">;
  sets: TablesInsert<"training_set">[];
}

const workout = () => {
  const navigation = useNavigation();

  // Store variables
  const { categories, getExercisesByCategoryId, createWorkoutSession } = useFitnessStore();
  const [selectedCategory, setSelectedCategory] =
    useState<Tables<"category"> | null>(null);

  // Fitness variables
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    []
  );

  // Timer variables
  const [startTime, setStartTime] = useState<number>(0);
  const [trainingSeconds, setTrainingSeconds] = useState<number>(0);

  // Timer
  useEffect(() => {
    if (startTime > 0) {
      const interval = setInterval(() => {
        setTrainingSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  // Handle category submit
  function handleCategorySubmit(category: Tables<"category">) {
    const exercises = getExercisesByCategoryId(category.id);
    const workoutExercises: WorkoutExercise[] = exercises.map((exercise) => {
      return {
        trainingExercise: {
          ...exercise,
          ecercise_id: exercise.id,
          max_repetitions: null,
          max_weight: null,
          training_session_id: "",
        },
        sets: [
          {
            repetitions: 0,
            weight: 0,
            training_exercise_id: "",
          },
        ],
      };
    });
    setWorkoutExercises(workoutExercises);
    setSelectedCategory(category);
    setStartTime(Date.now());
  }

  const handleAddSet = (exerciseIndex: number) => {
    const newWorkoutExercises = [...workoutExercises];
    newWorkoutExercises[exerciseIndex].sets.push({
      repetitions: 0,
      weight: 0,
      training_exercise_id: "",
    });
    setWorkoutExercises(newWorkoutExercises);
  };

  const handleDeleteSet = (exerciseIndex: number, setIndex: number) => {
    const newWorkoutExercises = [...workoutExercises];
    newWorkoutExercises[exerciseIndex].sets.splice(setIndex, 1);
    setWorkoutExercises(newWorkoutExercises);
  };

  const handleDeleteExercise = (exerciseIndex: number) => {
    Alert.alert("Delete Exercise", "Are you sure you want to delete this exercise?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
        const newWorkoutExercises = [...workoutExercises];
        newWorkoutExercises.splice(exerciseIndex, 1);
        setWorkoutExercises(newWorkoutExercises);
      } },
    ]);
  };

  const handleSaveWorkout = () => {
    if (selectedCategory) {
      createWorkoutSession(selectedCategory?.id, new Date(startTime), new Date(), workoutExercises);
      setSelectedCategory(null);
      setStartTime(0);
      setWorkoutExercises([]);
    }
  };

  // Set header title
  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCategory ? selectedCategory.title : "Workout",
    });
  }, [navigation, selectedCategory]);

  // Render content
  let content = null;

  // If no category is selected, render the select category screen
  if (!selectedCategory) {
    content = (
      <ScrollView>
        <SelectTrainingCategory
          categories={categories}
          onSubmit={handleCategorySubmit}
        />
      </ScrollView>
    );
  } else {
    content = (
      <>
        <WorkoutTimer seconds={trainingSeconds} />
        <View style={styles.container}>
          <FlatList
            data={workoutExercises}
            renderItem={({ item, index }) => (
              <TrainingExerciseForm
                workoutExercise={item}
                workoutIndex={index}
                onAddSet={() => handleAddSet(index)}
                onDeleteSet={(setIndex) => handleDeleteSet(index, setIndex)}
                onDeleteExercise={() => handleDeleteExercise(index)}
                onSetChange={(set, setIndex) => {
                  const newWorkoutExercises = [...workoutExercises];
                  newWorkoutExercises[index] = {
                    ...newWorkoutExercises[index],
                    sets: newWorkoutExercises[index].sets.map((s, i) =>
                      i === setIndex ? set : s
                    ),
                  };
                  setWorkoutExercises(newWorkoutExercises);
                }}
              />
            )}
          />
        <Button title="Save" onPress={handleSaveWorkout} />
        </View>
      </>
    );
  }

  return (
    <ThemedSafeAreaView style={styles.rootContainer}>
      {content}
    </ThemedSafeAreaView>
  );
};

export default workout;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 60,
  },
  container: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 60,
    width: "100%",
  },
});
