import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

export const DATABASE_NAME = "exercises";

const expoDb = openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expoDb);
