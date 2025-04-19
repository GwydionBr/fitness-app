import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import {
  Muscle,
  Force,
  Level,
  Mechanic,
  Equipment,
  Category,
} from "@/types/exercise";

export const exercises = sqliteTable("exercises", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  aliases: text("aliases", { mode: "json" }).$type<string[]>(),
  primaryMuscles: text("primary_muscles", { mode: "json" })
    .$type<Muscle[]>()
    .notNull(),
  secondaryMuscles: text("secondary_muscles", { mode: "json" })
    .$type<Muscle[]>()
    .notNull(),
  force: text("force").$type<Force>(),
  level: text("level").$type<Level>().notNull(),
  mechanic: text("mechanic").$type<Mechanic>(),
  equipment: text("equipment").$type<Equipment>(),
  category: text("category").$type<Category>().notNull(),
  instructions: text("instructions", { mode: "json" })
    .$type<string[]>()
    .notNull(),
  description: text("description"),
  tips: text("tips", { mode: "json" }).$type<string[]>(),
  images: text("images", { mode: "json" }).$type<string[]>().notNull(),
  isFavorite: integer("is_favorite", { mode: "boolean" })
    .notNull()
    .default(false),
  isUsed: integer("is_used", { mode: "boolean" }).notNull().default(false),
});

// Export Exercise type to use in your app
export type Exercise = typeof exercises.$inferSelect;
