import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import WorkoutTimer from "@/components/workout/WorkoutTimer";
import SelectTrainingCategory from "@/components/workout/SelectTrainingCategory";
import { useFitnessStore } from "@/stores/FitnessStore";
import { Tables } from "@/types/db.types";
import { useNavigation } from "expo-router";

const workout = () => {
  const navigation = useNavigation();
  const { categories } = useFitnessStore();
  const [selectedCategory, setSelectedCategory] =
    useState<Tables<"category"> | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [trainingSeconds, setTrainingSeconds] = useState<number>(0);

  useEffect(() => {
    if (startTime > 0) {
      const interval = setInterval(() => {
        setTrainingSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  function handleCategorySubmit(category: Tables<"category">) {
    setSelectedCategory(category);
    setStartTime(Date.now());
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCategory ? selectedCategory.title : "Workout",
    });
  }, [navigation, selectedCategory]);

  let content = null;

  if (!selectedCategory) {
    content = (
      <ScrollView>
        <SelectTrainingCategory
          categories={categories}
          onSubmit={handleCategorySubmit}
        />
      </ScrollView>
    );
  } else {
    content = (
      <>
        <WorkoutTimer seconds={trainingSeconds} />
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
