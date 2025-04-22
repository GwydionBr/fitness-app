import { useEffect, useLayoutEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { db } from "@/db";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Exercise, exercises } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { ThemedText } from "@/components/ThemedText";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { getExerciseImage } from "@/utils/imageLoader";
import IconButton from "@/components/ui/IconButton";

export default function EditExercise() {
  const { defaultExerciseId } = useLocalSearchParams();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    async function fetchExercise() {
      const selectedExercise = await db
        .select()
        .from(exercises)
        .where(eq(exercises.id, defaultExerciseId as string));
      setExercise(selectedExercise[0]);
      setIsFavorite(selectedExercise[0].isFavorite);
      navigation.setOptions({
        title: selectedExercise[0].name,
      });
    }
    fetchExercise();
  }, [navigation, defaultExerciseId]);

  async function handleFavoritePress() {
    console.log("pressed");
    if (exercise) {
      setIsFavorite(!isFavorite);
      await db.update(exercises).set({ isFavorite: !exercise.isFavorite }).where(eq(exercises.id, exercise.id));
    }
  }

  useEffect(() => {
    if (exercise) {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            icon={isFavorite ? "star.fill" : "star"}
            size={24}
            color={isFavorite ? "yellow" : "gray"}
            onPress={handleFavoritePress}
          />
        ),
      });
    }
  }, [exercise, isFavorite, navigation]);

  if (!exercise) {
    return <ThemedText>Exercise not found</ThemedText>;
  }

  return (
    <ThemedSafeAreaView className="flex-1 p-3">
      <ScrollView>
        <View className="flex-row gap-2 items-center justify-center my-3">
          <Image
            source={getExerciseImage(exercise.images[0])}
            className="w-48 h-48 rounded-lg"
          />
          <Image
            source={getExerciseImage(exercise.images[1])}
            className="w-48 h-48 rounded-lg"
          />
        </View>
        <View className="gap-1 my-3">
          <ThemedText>Primary Muscles: {exercise.primaryMuscles}</ThemedText>
          <ThemedText>
            Secondary Muscles: {exercise.secondaryMuscles}
          </ThemedText>
          <ThemedText>Force: {exercise.force}</ThemedText>
          <ThemedText>Level: {exercise.level}</ThemedText>
          <ThemedText>Mechanic: {exercise.mechanic}</ThemedText>
          <ThemedText>Equipment: {exercise.equipment}</ThemedText>
          <ThemedText>Category: {exercise.category}</ThemedText>
        </View>
        <View className="border-y border-gray-300 py-3">
          <ThemedText>{exercise.instructions}</ThemedText>
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}
