import { db } from "@/db";
import { exercises } from "@/db/schema";
import exerciseData from "@/db/exercises.json";
import { Muscle, Level, Mechanic, Equipment, Category, Force } from "@/types/exercise";
export async function seedDatabase() {
  try {
    // Check if the database is empty
    const existingExercises = await db.select().from(exercises).limit(1);

    if (existingExercises.length === 0) {
      console.log("Database is empty. Seeding initial data...");

      const initialExerciseData = exerciseData.map((exercise) => ({
        ...exercise,
        primaryMuscles: exercise.primaryMuscles as Muscle[],
        secondaryMuscles: exercise.secondaryMuscles as Muscle[],
        level: exercise.level as Level,
        mechanic: exercise.mechanic as Mechanic,
        equipment: exercise.equipment as Equipment,
        category: exercise.category as Category,
        images: exercise.images as string[],
        force: exercise.force as Force,
        id: exercise.id as string,
        instructions: exercise.instructions as string[],
      }));
      // Insert the exercise data
      await db.insert(exercises).values(initialExerciseData);

      console.log("Database seeded successfully!");
    } else {
      console.log("Database already contains data. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    // throw error;
  }
}
