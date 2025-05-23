import { useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import ExerciseRow from "@/components/Exercise/exerciseRow";
import IconButton from "@/components/ui/IconButton";

import { useFitnessStore } from "@/stores/FitnessStore";
import { useNavigation, useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";

export default function AllExercises() {
  const { exercises, getCategoriesByExerciseId } = useFitnessStore();
  const navigation = useNavigation();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          size={24}
          color={colorScheme === "dark" ? "#ECEDEE" : "#11181C"}
          onPress={() => {
            router.push("/addExercise");
          }}
        />
      ),
    });
  }, [navigation, colorScheme]);
  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseRow
            onPress={() => {
              router.push(`/(tabs)/(start)/(trainingExercise)/${item.id}`);
            }}
            exercise={item}
            categories={getCategoriesByExerciseId(item.id)}
          />
        )}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
