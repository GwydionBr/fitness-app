import { useLayoutEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useFitnessStore } from "@/stores/FitnessStore";
import { useNavigation, useRouter } from "expo-router";

import { StyleSheet, View } from "react-native";
import ExerciseRow from "@/components/Exercise/exerciseRow";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedTextInput from "@/components/ui/ThemedTextInput";
import { SwipeListView } from "react-native-swipe-list-view";
import DeleteSwipeRow from "@/components/ui/DeleteSwipeRow";
import ThemedMultipleSelect from "@/components/ui/ThemedMultipleSelect";

import { Tables } from "@/types/db.types";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams();
  const {
    exercises: allExercises,
    categories,
    getExercisesByCategoryId,
    updateCategory,
  } = useFitnessStore();
  const [category, setCategory] = useState<Tables<"category"> | null>(null);

  const [connectedExercises, setConnectedExercises] = useState<
    Tables<"exercise">[]
  >([]);

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      setCategory(category);
      setConnectedExercises(getExercisesByCategoryId(categoryId as string));
      navigation.setOptions({
        title: category?.title,
      });
    } else {
      // router.back();
    }
  }, [categoryId, categories, router, navigation]);

  if (!category) {
    return null;
  }

  const handleSelectedCategoriesChange = (selectedExercises: string[]) => {
    const newConnectedExercises = allExercises.filter((exercise) =>
      selectedExercises.includes(exercise.id)
    );
    setConnectedExercises((prev) => [...prev, ...newConnectedExercises]);
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setConnectedExercises((prev) =>
      prev.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  const handleSave = () => {
    console.log("saving");
    updateCategory(
      category.id,
      { title: category.title },
      connectedExercises.map((exercise) => exercise.id)
    );
    router.back();
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedTextInput
        label="Name"
        withBorder
        value={category.title}
        onChangeText={(text) => {
          setCategory({ ...category, title: text });
        }}
      />
      <ThemedMultipleSelect
        single={true}
        style={{ zIndex: 16 }}
        items={allExercises
          .filter((exercise) => !connectedExercises.includes(exercise))
          .map((exercise) => ({
            id: exercise.id,
            name: exercise.title,
          }))}
        selectedItems={[]}
        onSelectedItemsChange={handleSelectedCategoriesChange}
      />
      <ThemedText style={styles.exercisesContainer}>Exercises:</ThemedText>
      <SwipeListView
        rightOpenValue={-75}
        stopRightSwipe={-100}
        closeOnRowBeginSwipe={true}
        closeOnScroll={true}
        disableRightSwipe={true}
        data={connectedExercises}
        renderItem={({ item }) => <ExerciseRow exercise={item} />}
        keyExtractor={(item) => item.id}
        renderHiddenItem={({ item }) => (
          <DeleteSwipeRow
            onDelete={() => handleDeleteExercise(item.id)}
            size={24}
          />
        )}
      />
      <View className="flex-row justify-center">
        <ThemedButton
          type="primary"
          className="m-3 mb-10 p-4 w-36"
          textClassName="text-xl font-bold"
          onPress={handleSave}
        >
          Save
        </ThemedButton>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  exercisesContainer: {
    marginVertical: 16,
  },
});
