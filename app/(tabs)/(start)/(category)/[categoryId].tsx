import { useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useFitnessStore } from "@/stores/FitnessStore";

import { useNavigation } from "@react-navigation/native";
import ExerciseRow from "@/components/Exercise/exerciseRow";

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams();
  const { categories,  getExercisesByCategoryId } = useFitnessStore();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const category = categories.find((category) => category.id === categoryId);
    navigation.setOptions({
      title: category?.title,
    });
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={getExercisesByCategoryId(categoryId as string)}
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
