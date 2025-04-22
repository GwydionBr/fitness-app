import { View, StyleSheet, Pressable, Image } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { Tables } from "@/types/db.types";
import { Exercise, exercises } from "@/db/schema";
import { getExerciseImage } from "@/utils/imageLoader";
import IconButton from "../ui/IconButton";
import { useState } from "react";
import { db } from "@/db";
import { eq } from "drizzle-orm";

interface NewExerciseRowProps {
  exercise: Exercise;
  categories?: Tables<"category">[];
  onPress?: () => void;
}

export default function NewExerciseRow({
  exercise,
  categories,
  onPress,
}: NewExerciseRowProps) {
  const [isFavorite, setIsFavorite] = useState(exercise.isFavorite);

  async function handleFavoritePress() {
    setIsFavorite((prev) => !prev);
    await db
      .update(exercises)
      .set({ isFavorite: !isFavorite })
      .where(eq(exercises.id, exercise.id));
  }

  return (
    <Pressable
      className="active:opacity-75 p-2 m-2 rounded-lg border border-gray-400"
      onPress={onPress}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-2 items-center">
          <Image
            source={getExerciseImage(exercise.images[0])}
            className="w-12 h-12 rounded-lg"
          />
          <ThemedText className="text-lg">{exercise.name} </ThemedText>
        </View>
        <IconButton
          icon={isFavorite ? "star.fill" : "star"}
          size={24}
          color={isFavorite ? "yellow" : "gray"}
          onPress={handleFavoritePress}
        />
      </View>
      {categories && (
        <View className="flex-row justify-between">
          <ThemedText lightColor="gray" darkColor="gray" className="text-sm">
            {categories.map((category) => category.title).join(", ")}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 10,
  },
  upperRow: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
