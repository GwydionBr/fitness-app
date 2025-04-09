import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { useFitnessStore } from "@/stores/FitnessStore";
import { Tables } from "@/types/db.types";
import { useNavigation } from "@react-navigation/native";
import ExerciseRow from "@/components/Exercise/exerciseRow";

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams();
  const { categories, exercises, exerciseCategories } = useFitnessStore();
  const [exercisesInCategory, setExercisesInCategory] = useState<
    Tables<"exercise">[]
  >([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const category = categories.find((category) => category.id === categoryId);
    navigation.setOptions({
      title: category?.title,
    });
  }, [categoryId]);

  useEffect(() => {
    const exercisesInCategory = exercises.filter((exercise) =>
      exerciseCategories.some(
        (exerciseCategory) =>
          exerciseCategory.exercise_id === exercise.id &&
          exerciseCategory.category_id === categoryId
      )
    );
    setExercisesInCategory(exercisesInCategory);
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={exercisesInCategory}
        renderItem={({ item }) => <ExerciseRow exercise={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
