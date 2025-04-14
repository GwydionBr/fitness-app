import { create } from "zustand";
import { Tables, TablesUpdate, TablesInsert } from "@/types/db.types";
import * as actions from "@/actions";
import {
  TrainingSessionResponse,
  TrainingExerciseResponse,
} from "@/types/action.types";

export interface WorkoutExercise {
  trainingExercise: TablesInsert<"training_exercise">;
  sets: TablesInsert<"training_set">[];
}

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

  // Create Functions
  createCategory: (data: TablesInsert<"category">) => Promise<void>;

  createExercise: (
    data: TablesInsert<"exercise">,
    categoryIds?: string[]
  ) => Promise<void>;

  createExerciseCategory: (
    data: TablesInsert<"exercise_category">
  ) => Promise<void>;

  createTrainingExercise: (
    data: TablesInsert<"training_exercise">
  ) => Promise<TrainingExerciseResponse>;

  createTrainingSession: (
    data: TablesInsert<"training_session">
  ) => Promise<TrainingSessionResponse>;

  createTrainingSessionCategory: (
    data: TablesInsert<"training_session_category">
  ) => Promise<void>;

  createTrainingSet: (data: TablesInsert<"training_set">) => Promise<void>;

  createWorkoutSession: (
    categoryId: string,
    startTime: Date,
    endTime: Date,
    workoutExercises: WorkoutExercise[]
  ) => Promise<{ success: boolean; errorMessage: string }>;

  // Update Functions
  updateCategory: (
    id: string,
    data: TablesUpdate<"category">,
    exerciseIds?: string[]
  ) => Promise<void>;

  updateExercise: (
    id: string,
    data: TablesUpdate<"exercise">,
    categoryIds?: string[]
  ) => Promise<void>;

  updateTrainingExercise: (
    id: string,
    data: TablesUpdate<"training_exercise">
  ) => Promise<void>;

  updateTrainingSession: (
    id: string,
    data: TablesUpdate<"training_session">
  ) => Promise<void>;

  updateTrainingSessionCategory: (
    id: string,
    data: TablesUpdate<"training_session_category">
  ) => Promise<void>;

  updateTrainingSet: (
    id: string,
    data: TablesUpdate<"training_set">
  ) => Promise<void>;

  // Delete Functions
  deleteCategory: (id: string) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
  deleteExerciseCategory: (id: string) => Promise<void>;
  deleteTrainingExercise: (id: string) => Promise<void>;
  deleteTrainingSession: (id: string) => Promise<void>;
  deleteTrainingSessionCategory: (id: string) => Promise<void>;
  deleteTrainingSet: (id: string) => Promise<void>;

  // Helper functions
  getExercisesByCategoryId: (categoryId: string) => Tables<"exercise">[];
  getCategoriesByExerciseId: (exerciseId: string) => Tables<"category">[];
  getSessionData: (sessionId: string) => Promise<{
    session: Tables<"training_session">;
    exercises: Tables<"training_exercise">[];
    sets: Tables<"training_set">[];
  }>;
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

  // Create Functions
  createCategory: async (data) => {
    const response = await actions.createRow({ tableName: "category", data });
    if (response.success) {
      set((state) => ({ categories: [...state.categories, ...response.data] }));
    }
  },

  createExercise: async (data, categoryIds) => {
    const { createExerciseCategory } = get();
    const response = await actions.createRow({ tableName: "exercise", data });
    if (response.success) {
      set((state) => ({ exercises: [...state.exercises, ...response.data] }));
      if (categoryIds) {
        for (const categoryId of categoryIds) {
          await createExerciseCategory({
            exercise_id: response.data[0].id,
            category_id: categoryId,
          });
        }
      }
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
      return {
        success: false,
        errorMessage: "Failed to create training session",
      };
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
        return {
          success: false,
          errorMessage: "Failed to create training exercise",
        };
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

  // Update Functions
  updateCategory: async (id, data, exerciseIds) => {
    const { createExerciseCategory, deleteExerciseCategory, exerciseCategories } = get();
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
      if (exerciseIds) {
        const existingExerciseCategories = exerciseCategories.filter(
          (ec) => ec.category_id === id
        );
        for (const ec of existingExerciseCategories) {
          if (!exerciseIds.includes(ec.exercise_id)) {
            await deleteExerciseCategory(ec.id);
          }
        }
        for (const exerciseId of exerciseIds) {
          if (
            !existingExerciseCategories.some(
              (ec) => ec.exercise_id === exerciseId
            )
          ) {
            await createExerciseCategory({
              exercise_id: exerciseId,
              category_id: id,
            });
          }
        }
      }
    }
  },

  updateExercise: async (id, data, categoryIds) => {
    const {
      createExerciseCategory,
      exerciseCategories,
      deleteExerciseCategory,
    } = get();
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
      if (categoryIds) {
        const existingExerciseCategories = exerciseCategories.filter(
          (ec) => ec.exercise_id === id
        );
        for (const ec of existingExerciseCategories) {
          if (!categoryIds.includes(ec.category_id)) {
            await deleteExerciseCategory(ec.id);
          }
        }
        for (const categoryId of categoryIds) {
          if (
            !existingExerciseCategories.some(
              (ec) => ec.category_id === categoryId
            )
          ) {
            await createExerciseCategory({
              exercise_id: id,
              category_id: categoryId,
            });
          }
        }
      }
    }
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

  // Delete Functions
  deleteCategory: async (id) => {
    const response = await actions.deleteRow({ tableName: "category", id });
    if (response.success) {
      set((state) => ({
        categories: state.categories.filter((item) => item.id !== id),
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

  deleteTrainingSet: async (id) => {
    const response = await actions.deleteRow({ tableName: "training_set", id });
    if (response.success) {
      set((state) => ({
        trainingSets: state.trainingSets.filter((item) => item.id !== id),
      }));
    }
  },

  // Helper Functions
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

  getSessionData: async (sessionId: string) => {
    const { trainingSessions, trainingExercises, trainingSets } = get();
    const session = trainingSessions.find(
      (session) => session.id === sessionId
    );
    if (!session) {
      throw new Error("Session not found");
    }
    const exercises = trainingExercises.filter(
      (exercise) => exercise.training_session_id === sessionId
    );
    const sets = trainingSets.filter((set) =>
      exercises.some((exercise) => exercise.id === set.training_exercise_id)
    );
    return { session, exercises, sets };
  },
}));
