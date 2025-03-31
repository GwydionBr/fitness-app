import { Tables } from "@/types/db.types";

// Liste der erlaubten Tabellen
export type TableNames =
  | "category"
  | "exercise"
  | "exercise_category"
  | "profiles"
  | "training_exercise"
  | "training_session"
  | "training_session_category"
  | "training_set";

// Basis-Fehler-Response
interface ErrorResponse {
  success: false;
  data: null;
  error: string;
}

// Basis-Erfolgs-Response mit generischer Einschränkung
interface SuccessResponse<T extends TableNames> {
  success: true;
  data: Tables<T>[];
  error: null;
}

// Gemeinsamer Typ für alle API-Responses
export type ApiResponse<T extends TableNames> =
  | SuccessResponse<T>
  | ErrorResponse;

// Vordefinierte Typen für spezifische Endpunkte
export type DeleteResponse =
  | { success: true; data: null; error: null }
  | ErrorResponse;
export type CategoryResponse = ApiResponse<"category">;
export type ExerciseResponse = ApiResponse<"exercise">;
export type ExerciseCategoryResponse = ApiResponse<"exercise_category">;
export type TrainingExerciseResponse = ApiResponse<"training_exercise">;
export type TrainingSessionResponse = ApiResponse<"training_session">;
export type TrainingSessionCategoryResponse =
  ApiResponse<"training_session_category">;
export type TrainingSetResponse = ApiResponse<"training_set">;
