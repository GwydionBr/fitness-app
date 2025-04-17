import { create } from "zustand";
import { Tables } from "@/types/db.types";
import { WorkoutExercise } from "./FitnessStore";

export enum TimerState {
  Stopped = "stopped",
  Running = "running",
  Paused = "paused",
}

interface WorkoutStore {
  timerState: TimerState;
  startTime: number | null;
  trainingSeconds: number;
  workoutExercises: WorkoutExercise[];
  selectedCategory: Tables<"category"> | null;
  setTimerState: (timerState: TimerState) => void;
  setStartTime: (startTime: number | null) => void;
  setTrainingSeconds: (trainingSeconds: number) => void;
  setWorkoutExercises: (workoutExercises: WorkoutExercise[]) => void;
  setSelectedCategory: (selectedCategory: Tables<"category"> | null) => void;
  startWorkout: () => void;
  pauseWorkout: () => void;
  stopWorkout: () => void;
  resetWorkout: () => void;

  deleteExercise: (exerciseIndex: number) => void;
  addSet: (exerciseIndex: number) => void;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  timerState: TimerState.Stopped,
  startTime: null,
  trainingSeconds: 0,
  workoutExercises: [],
  selectedCategory: null,

  setTimerState: (timerState) => set({ timerState }),
  setStartTime: (startTime) => set({ startTime }),
  setTrainingSeconds: (trainingSeconds) => set({ trainingSeconds }),
  setWorkoutExercises: (workoutExercises) => set({ workoutExercises }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),

  startWorkout: () => {
    const { timerState, startTime } = get();
    if (timerState === TimerState.Running) return;

    set({
      timerState: TimerState.Running,
      startTime: startTime || Date.now(),
    });
  },

  pauseWorkout: () => {
    const { timerState } = get();
    if (timerState !== TimerState.Running) return;

    set({ timerState: TimerState.Paused });
  },

  stopWorkout: () => {
    set({
      timerState: TimerState.Stopped,
      startTime: 0,
      trainingSeconds: 0,
    });
  },

  resetWorkout: () => {
    set({
      timerState: TimerState.Stopped,
      startTime: 0,
      trainingSeconds: 0,
      workoutExercises: [],
      selectedCategory: null,
    });
  },

  deleteExercise: (exerciseIndex: number) => {
    const { workoutExercises } = get();
    const newWorkoutExercises = [...workoutExercises];
    newWorkoutExercises.splice(exerciseIndex, 1);
    set({ workoutExercises: newWorkoutExercises });
  },

  addSet: (exerciseIndex: number) => {
    const { workoutExercises } = get();
    const newWorkoutExercises = [...workoutExercises];
    newWorkoutExercises[exerciseIndex].sets.push({
      repetitions: 0,
      weight: 0,
      training_exercise_id: "",
    });
    set({ workoutExercises: newWorkoutExercises });
  },
}));
