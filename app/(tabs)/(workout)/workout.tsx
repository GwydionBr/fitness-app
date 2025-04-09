import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import WorkoutTimer from "@/components/workout/WorkoutTimer";
import CategorySelector from "@/components/workout/CategorySelector";
import { useFitnessStore } from "@/stores/FitnessStore";
import { Tables } from "@/types/db.types";
import { useNavigation } from "expo-router";  

const workout = () => {
  const navigation = useNavigation();
  const { categories } = useFitnessStore();
  const [selectedCategory, setSelectedCategory] =
    useState<Tables<"category"> | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCategory
        ? selectedCategory.title
        : "Workout",
    });
  }, [navigation, selectedCategory]);

  let content = null;

  if (!selectedCategory) {
    content = (
      <ScrollView>
        <CategorySelector
          categories={categories}
          onSubmit={(category: Tables<"category">) =>
            setSelectedCategory(category)
          }
        />
      </ScrollView>
    );
  } else {
    content = (
      <>
        <WorkoutTimer seconds={3665} />
        <ScrollView>
          <ThemedText style={styles.text}>workout</ThemedText>
        </ScrollView>
      </>
    );
  }

  return (
    <ThemedSafeAreaView style={styles.rootContainer}>
      {content}
    </ThemedSafeAreaView>
  );
};

export default workout;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 60,
  },
});
