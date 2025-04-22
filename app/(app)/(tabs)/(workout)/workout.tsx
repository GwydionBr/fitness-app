import { useEffect, useState } from "react";
import { useFitnessStore } from "@/stores/FitnessStore";
import { TimerState, useWorkoutStore } from "@/stores/WorkoutStore";
import { useRouter, useNavigation } from "expo-router";

import { StyleSheet, ScrollView, FlatList, View, Alert } from "react-native";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";
import WorkoutTimer from "@/components/workout/WorkoutTimer";
import SelectTrainingCategory from "@/components/workout/SelectTrainingCategory";
import TrainingExerciseForm from "@/components/workout/TrainingExerciseForm";
import IconButton from "@/components/ui/IconButton";
import ThemedButton from "@/components/ui/ThemedButton";

import type { WorkoutExercise } from "@/stores/FitnessStore";
import type { Tables } from "@/types/db.types";

const workout = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Fitness Store variables
  const { categories, getExercisesByCategoryId, createWorkoutSession } =
    useFitnessStore();

  // Workout Store variables
  const {
    timerState,
    startTime,
    trainingSeconds,
    workoutExercises,
    selectedCategory,
    setTrainingSeconds,
    setWorkoutExercises,
    setSelectedCategory,
    startWorkout,
    resetWorkout,
    addSet,
    deleteExercise,
  } = useWorkoutStore();

  useEffect(() => {
    if (startTime && timerState === TimerState.Running) {
      const interval = setInterval(() => {
        setTrainingSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, timerState]);

  // Set header title
  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCategory ? selectedCategory.title : "Workout",
      headerLeft: ({ tintColor, size }: { tintColor: string; size: number }) =>
        selectedCategory && (
          <IconButton
            icon="xmark"
            size={size}
            color={tintColor}
            onPress={handleCancelWorkout}
          />
        ),
      headerRight: ({ tintColor, size }: { tintColor: string; size: number }) =>
        selectedCategory && (
          <IconButton
            icon="plus"
            size={size}
            color={tintColor}
            onPress={() => router.push("/addTrainingExercise")}
          />
        ),
    });
  }, [navigation, selectedCategory]);

  const handleCategorySubmit = (category: Tables<"category">) => {
    const exercises = getExercisesByCategoryId(category.id);
    const workoutExercises: WorkoutExercise[] = exercises.map((exercise) => {
      return {
        trainingExercise: {
          ...exercise,
          ecercise_id: exercise.id,
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
    startWorkout();
  };

  const handleDeleteSet = (exerciseIndex: number, setIndex: number) => {
    const newWorkoutExercises = [...workoutExercises];
    newWorkoutExercises[exerciseIndex].sets.splice(setIndex, 1);
    setWorkoutExercises(newWorkoutExercises);
  };

  const handleDeleteExercise = (exerciseIndex: number) => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteExercise(exerciseIndex);
          },
        },
      ]
    );
  };

  const handleSaveWorkout = async () => {
    setIsLoading(true);
    if (selectedCategory && startTime) {
      const response = await createWorkoutSession(
        selectedCategory?.id,
        new Date(startTime),
        new Date(),
        workoutExercises
      );
      if (response.success) {
        resetWorkout();
        setWorkoutExercises([]);
        router.replace("/(tabs)/(analysis)/analysis");
      } else {
        Alert.alert("Error", response.errorMessage);
      }
    }
    setIsLoading(false);
  };

  const handleCancelWorkout = () => {
    Alert.alert(
      "Cancel Workout",
      "Are you sure you want to cancel this workout?",
      [
        { text: "Continue Workout", style: "cancel" },
        {
          text: "Cancel Workout",
          style: "destructive",
          onPress: () => {
            resetWorkout();
          },
        },
      ]
    );
  };

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
      <ThemedSafeAreaView style={styles.rootContainer}>
        <WorkoutTimer seconds={trainingSeconds} />
        <View style={styles.container}>
          <FlatList
            data={workoutExercises}
            renderItem={({ item, index }) => (
              <TrainingExerciseForm
                isEditing={true}
                workoutExercise={item}
                onAddSet={() => addSet(index)}
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
            ListHeaderComponent={<View style={{ height: 80 }} />}
            ListFooterComponent={
              <View style={styles.submitButton}>
                <ThemedButton
                  type="primary"
                  className="my-5 p-3"
                  onPress={handleSaveWorkout}
                  isLoading={isLoading}
                >
                  Save
                </ThemedButton>
              </View>
            }
          />
        </View>
      </ThemedSafeAreaView>
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
    width: "100%",
  },
  submitButton: {
    marginBottom: 25,
    marginHorizontal: 25,
  },
});
