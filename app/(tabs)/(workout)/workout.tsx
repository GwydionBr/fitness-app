import React, { useEffect, useState } from "react";
import { useFitnessStore } from "@/stores/FitnessStore";
import { useRouter, useNavigation } from "expo-router";

import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Alert,
  Button,
} from "react-native";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import WorkoutTimer from "@/components/workout/WorkoutTimer";
import SelectTrainingCategory from "@/components/workout/SelectTrainingCategory";
import TrainingExerciseForm from "@/components/workout/TrainingExerciseForm";
import IconButton from "@/components/ui/IconButton";
import { WorkoutExercise } from "@/stores/FitnessStore";
import ThemedSearchModal, { Item } from "@/components/ui/ThemedSearchModal";

import { Tables } from "@/types/db.types";

const workout = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  // Store variables
  const {
    exercises: allExercises,
    categories,
    getExercisesByCategoryId,
    createWorkoutSession,
    getExerciseById,
  } = useFitnessStore();
  const [selectedCategory, setSelectedCategory] =
    useState<Tables<"category"> | null>(null);

  // Fitness variables
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    []
  );
  const [filteredExercises, setFilteredExercises] = useState<
    Tables<"exercise">[]
  >([]);

  // Update filteredExercises whenever workoutExercises changes
  useEffect(() => {
    const usedExerciseIds = workoutExercises.map(
      (exercise) => exercise.trainingExercise.ecercise_id
    );
    const newFilteredExercises = allExercises.filter(
      (exercise) => !usedExerciseIds.includes(exercise.id)
    );
    setFilteredExercises(newFilteredExercises);
  }, [workoutExercises, allExercises]);

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

  const resetWorkout = () => {
    setSelectedCategory(null);
    setStartTime(0);
    setWorkoutExercises([]);
  };

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
            onPress={() => setShowModal(true)}
          />
        ),
    });
  }, [navigation, selectedCategory]);

  // Handle category submit
  function handleCategorySubmit(category: Tables<"category">) {
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
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const exerciseId =
              workoutExercises[exerciseIndex].trainingExercise.ecercise_id;
            const newWorkoutExercises = [...workoutExercises];
            newWorkoutExercises.splice(exerciseIndex, 1);
            setWorkoutExercises(newWorkoutExercises);
            const exercise = getExerciseById(exerciseId);
            if (exercise) {
              setFilteredExercises((prev) => [...prev, exercise]);
            }
          },
        },
      ]
    );
  };

  const handleSaveWorkout = async () => {
    if (selectedCategory) {
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

  const handleModalClose = (item?: Item) => {
    if (item) {
      // Add exercise to workout
      const exercise = getExerciseById(item.id);
      if (exercise) {
        setWorkoutExercises([
          ...workoutExercises,
          {
            trainingExercise: {
              ...exercise,
              ecercise_id: exercise.id,
              training_session_id: "",
            },
            sets: [{ repetitions: 0, weight: 0, training_exercise_id: "" }],
          },
        ]);
      }
    }
    setShowModal(false);
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
        <ThemedSearchModal
          visible={showModal}
          onClose={handleModalClose}
          items={filteredExercises.map((exercise) => ({
            id: exercise.id,
            name:
              exercise.title +
              (exercise.information && " (" + exercise.information + ")"),
          }))}
        />
        <View style={styles.container}>
          <FlatList
            data={workoutExercises}
            renderItem={({ item, index }) => (
              <TrainingExerciseForm
                isEditing={true}
                workoutExercise={item}
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
            ListHeaderComponent={<View style={{ height: 80 }} />}
            ListFooterComponent={
              <View style={styles.submitButton}>
                <Button title="Save" onPress={handleSaveWorkout} />
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
    marginBottom: 70,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
