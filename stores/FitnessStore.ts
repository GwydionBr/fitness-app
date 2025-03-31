import { create } from "zustand";
import { Tables } from "@/types/db.types";
import * as actions from "@/actions";

interface FitnessStore {
  categories: Tables<"category">[];
  exercises: Tables<"exercise">[];
  exerciseCategories: Tables<"exercise_category">[];
  trainingExercises: Tables<"training_exercise">[];
  trainingSessions: Tables<"training_session">[];
  trainingSessionCategories: Tables<"training_session_category">[];
  trainingSets: Tables<"training_set">[];

  fetchAllData: () => Promise<void>;
}

export const useFitnessStore = create<FitnessStore>((set) => ({
  categories: [],
  exercises: [],
  exerciseCategories: [],
  trainingExercises: [],
  trainingSessions: [],
  trainingSessionCategories: [],
  trainingSets: [],

  fetchAllData: async () => {
    const [
      categories,
      exercises,
      exerciseCategories,
      trainingExercises,
      trainingSessions,
      trainingSessionCategories,
      trainingSets,
    ] = await Promise.all([
      actions.getAllRows("category"),
      actions.getAllRows("exercise"),
      actions.getAllRows("exercise_category"),
      actions.getAllRows("training_exercise"),
      actions.getAllRows("training_session"),
      actions.getAllRows("training_session_category"),
      actions.getAllRows("training_set"),
    ]);

    set({
      categories: categories.data || [],
      exercises: exercises.data || [],
      exerciseCategories: exerciseCategories.data || [],
      trainingExercises: trainingExercises.data || [],
      trainingSessions: trainingSessions.data || [],
      trainingSessionCategories: trainingSessionCategories.data || [],
      trainingSets: trainingSets.data || [],
    });
  },
}));