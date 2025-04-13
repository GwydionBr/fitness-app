import { create } from "zustand";
import { Tables, TablesUpdate, TablesInsert } from "@/types/db.types";
import * as actions from "@/actions";
import { WorkoutExercise } from "@/app/(tabs)/(workout)/workout";
import {
  TrainingSessionResponse,
  TrainingExerciseResponse,
} from "@/types/action.types";

interface FitnessStore {
  categories: Tables<"category">[];
  exercises: Tables<"exercise">[];
  exerciseCategories: Tables<"exercise_category">[];
  trainingExercises: Tables<"training_exercise">[];
  trainingSessions: Tables<"training_session">[];
  trainingSessionCategories: Tables<"training_session_category">[];
  trainingSets: Tables<"training_set">[];

  isFetching: boolean;
  fetchAllData: () => Promise<void>;

  // Category CRUD Functions
  createCategory: (data: TablesInsert<"category">) => Promise<void>;
  updateCategory: (id: string, data: TablesUpdate<"category">) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Exercise CRUD Functions
  createExercise: (data: TablesInsert<"exercise">) => Promise<void>;
  updateExercise: (id: string, data: TablesUpdate<"exercise">) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;

  // Exercise Category CRUD Functions
  createExerciseCategory: (
    data: TablesInsert<"exercise_category">
  ) => Promise<void>;
  updateExerciseCategory: (
    id: string,
    data: TablesUpdate<"exercise_category">
  ) => Promise<void>;
  deleteExerciseCategory: (id: string) => Promise<void>;

  // Training Exercise CRUD Functions
  createTrainingExercise: (
    data: TablesInsert<"training_exercise">
  ) => Promise<TrainingExerciseResponse>;
  updateTrainingExercise: (
    id: string,
    data: TablesUpdate<"training_exercise">
  ) => Promise<void>;
  deleteTrainingExercise: (id: string) => Promise<void>;

  // Training Session CRUD Functions
  createTrainingSession: (
    data: TablesInsert<"training_session">
  ) => Promise<TrainingSessionResponse>;
  updateTrainingSession: (
    id: string,
    data: TablesUpdate<"training_session">
  ) => Promise<void>;
  deleteTrainingSession: (id: string) => Promise<void>;

  // Training Session Category CRUD Functions
  createTrainingSessionCategory: (
    data: TablesInsert<"training_session_category">
  ) => Promise<void>;
  updateTrainingSessionCategory: (
    id: string,
    data: TablesUpdate<"training_session_category">
  ) => Promise<void>;
  deleteTrainingSessionCategory: (id: string) => Promise<void>;

  // Training Set CRUD Functions
  createTrainingSet: (data: TablesInsert<"training_set">) => Promise<void>;
  updateTrainingSet: (
    id: string,
    data: TablesUpdate<"training_set">
  ) => Promise<void>;
  deleteTrainingSet: (id: string) => Promise<void>;

  // Helper functions
  getExercisesByCategoryId: (categoryId: string) => Tables<"exercise">[];
  getCategoriesByExerciseId: (exerciseId: string) => Tables<"category">[];

  createWorkoutSession: (
    categoryId: string,
    startTime: Date,
    endTime: Date,
    workoutExercises: WorkoutExercise[]
  ) => Promise<{ success: boolean; errorMessage: string }>;
}

export const useFitnessStore = create<FitnessStore>((set, get) => ({
  categories: [],
  exercises: [],
  exerciseCategories: [],
  trainingExercises: [],
  trainingSessions: [],
  trainingSessionCategories: [],
  trainingSets: [],
  isFetching: false,

  fetchAllData: async () => {
    set({ isFetching: true });
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
    set({ isFetching: false });
  },

  createCategory: async (data) => {
    const response = await actions.createRow({ tableName: "category", data });
    if (response.success) {
      set((state) => ({ categories: [...state.categories, ...response.data] }));
    }
  },

  updateCategory: async (id, data) => {
    const response = await actions.updateRow({
      tableName: "category",
      id,
      data,
    });
    if (response.success) {
      set((state) => ({
        categories: state.categories.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    }
  },

  deleteCategory: async (id) => {
    const response = await actions.deleteRow({ tableName: "category", id });
    if (response.success) {
      set((state) => ({
        categories: state.categories.filter((item) => item.id !== id),
      }));
    }
  },

  createExercise: async (data) => {
    const response = await actions.createRow({ tableName: "exercise", data });
    if (response.success) {
      set((state) => ({ exercises: [...state.exercises, ...response.data] }));
    }
  },

  updateExercise: async (id, data) => {
    const response = await actions.updateRow({
      tableName: "exercise",
      id,
      data,
    });
    if (response.success) {
      set((state) => ({
        exercises: state.exercises.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    }
  },

  deleteExercise: async (id) => {
    const response = await actions.deleteRow({ tableName: "exercise", id });
    if (response.success) {
      set((state) => ({
        exercises: state.exercises.filter((item) => item.id !== id),
      }));
    }
  },

  createExerciseCategory: async (data) => {
    const response = await actions.createRow({
      tableName: "exercise_category",
      data,
    });
    if (response.success) {
      set((state) => ({
        exerciseCategories: [...state.exerciseCategories, ...response.data],
      }));
    }
  },

  updateExerciseCategory: async (id, data) => {
    const response = await actions.updateRow({
      tableName: "exercise_category",
      id,
      data,
    });
    if (response.success) {
      set((state) => ({
        exerciseCategories: state.exerciseCategories.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    }
  },

  deleteExerciseCategory: async (id) => {
    const response = await actions.deleteRow({
      tableName: "exercise_category",
      id,
    });
    if (response.success) {
      set((state) => ({
        exerciseCategories: state.exerciseCategories.filter(
          (item) => item.id !== id
        ),
      }));
    }
  },

  createTrainingExercise: async (data) => {
    const response = await actions.createRow({
      tableName: "training_exercise",
      data,
    });
    if (response.success) {
      set((state) => ({
        trainingExercises: [...state.trainingExercises, ...response.data],
      }));
    }
    return response;
  },

  updateTrainingExercise: async (id, data) => {
    const response = await actions.updateRow({
      tableName: "training_exercise",
      id,
      data,
    });
    if (response.success) {
      set((state) => ({
        trainingExercises: state.trainingExercises.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    }
  },

  deleteTrainingExercise: async (id) => {
    const response = await actions.deleteRow({
      tableName: "training_exercise",
      id,
    });
    if (response.success) {
      set((state) => ({
        trainingExercises: state.trainingExercises.filter(
          (item) => item.id !== id
        ),
      }));
    }
  },

  createTrainingSession: async (data) => {
    const response = await actions.createRow({
      tableName: "training_session",
      data,
    });
    if (response.success) {
      set((state) => ({
        trainingSessions: [...state.trainingSessions, ...response.data],
      }));
    }
    return response;
  },

  updateTrainingSession: async (id, data) => {
    const response = await actions.updateRow({
      tableName: "training_session",
      id,
      data,
    });
    if (response.success) {
      set((state) => ({
        trainingSessions: state.trainingSessions.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    }
  },

  deleteTrainingSession: async (id) => {
    const response = await actions.deleteRow({
      tableName: "training_session",
      id,
    });
    if (response.success) {
      set((state) => ({
        trainingSessions: state.trainingSessions.filter(
          (item) => item.id !== id
        ),
      }));
    }
  },

  createTrainingSessionCategory: async (data) => {
    const response = await actions.createRow({
      tableName: "training_session_category",
      data,
    });
    if (response.success) {
      set((state) => ({
        trainingSessionCategories: [
          ...state.trainingSessionCategories,
          ...response.data,
        ],
      }));
    }
  },

  updateTrainingSessionCategory: async (id, data) => {
    const response = await actions.updateRow({
      tableName: "training_session_category",
      id,
      data,
    });
    if (response.success) {
      set((state) => ({
        trainingSessionCategories: state.trainingSessionCategories.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    }
  },

  deleteTrainingSessionCategory: async (id) => {
    const response = await actions.deleteRow({
      tableName: "training_session_category",
      id,
    });
    if (response.success) {
      set((state) => ({
        trainingSessionCategories: state.trainingSessionCategories.filter(
          (item) => item.id !== id
        ),
      }));
    }
  },

  createTrainingSet: async (data) => {
    const response = await actions.createRow({
      tableName: "training_set",
      data,
    });
    if (response.success) {
      set((state) => ({
        trainingSets: [...state.trainingSets, ...response.data],
      }));
    }
  },

  updateTrainingSet: async (id, data) => {
    const response = await actions.updateRow({
      tableName: "training_set",
      id,
      data,
    });
    if (response.success) {
      set((state) => ({
        trainingSets: state.trainingSets.map((item) =>
          item.id === id ? { ...item, ...data } : item
        ),
      }));
    }
  },

  deleteTrainingSet: async (id) => {
    const response = await actions.deleteRow({ tableName: "training_set", id });
    if (response.success) {
      set((state) => ({
        trainingSets: state.trainingSets.filter((item) => item.id !== id),
      }));
    }
  },

  getExercisesByCategoryId: (categoryId) => {
    const { exercises, exerciseCategories } = get();
    const exerciseIds = exerciseCategories
      .filter((ec) => ec.category_id === categoryId)
      .map((ec) => ec.exercise_id);

    return exercises.filter((exercise) => exerciseIds.includes(exercise.id));
  },

  getCategoriesByExerciseId: (exerciseId) => {
    const { categories, exerciseCategories } = get();
    const categoryIds = exerciseCategories
      .filter((ec) => ec.exercise_id === exerciseId)
      .map((ec) => ec.category_id);

    return categories.filter((category) => categoryIds.includes(category.id));
  },

  createWorkoutSession: async (
    categoryId: string,
    startTime: Date,
    endTime: Date,
    workoutExercises: WorkoutExercise[]
  ) => {
    const {
      createTrainingSession,
      createTrainingExercise,
      createTrainingSet,
      createTrainingSessionCategory,
    } = get();

    // Create training session
    const trainingSessionResponse = await createTrainingSession({
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
    });

    if (
      !trainingSessionResponse.success ||
      !trainingSessionResponse.data?.[0]?.id
    ) {
      return { success: false, errorMessage: "Failed to create training session" };

    }

    const sessionId = trainingSessionResponse.data[0].id;

    // Create training session category
    await createTrainingSessionCategory({
      training_session_id: sessionId,
      categoy_id: categoryId,
      user_id: "user will be added in the action",
    });

    // Create training exercises and sets
    for (const workoutExercise of workoutExercises) {
      // Create training exercise
      const trainingExerciseResponse = await createTrainingExercise({
        ...workoutExercise.trainingExercise,
        training_session_id: sessionId,
      });

      if (
        !trainingExerciseResponse.success ||
        !trainingExerciseResponse.data?.[0]?.id
      ) {
        return { success: false, errorMessage: "Failed to create training exercise" };
      }

      const exerciseId = trainingExerciseResponse.data[0].id;

      // Create training sets
      for (const set of workoutExercise.sets) {
        await createTrainingSet({
          ...set,
          training_exercise_id: exerciseId,
        });
      }
    }

    return { success: true, errorMessage: "" };
  },
}));
