import { StyleSheet, useColorScheme, FlatList, View } from "react-native";
import { db } from "@/db";
import { Exercise, exercises } from "@/db/schema";
import { useEffect, useState, useLayoutEffect } from "react";
import SearchBar from "react-native-platform-searchbar";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import NewExerciseRow from "@/components/Exercise/newExerciseRow";
import { useRouter, useNavigation } from "expo-router";
import IconButton from "@/components/ui/IconButton";
import ExerciseFilter from "@/components/Exercise/ExerciseFilter";

export default function AllNewExercises() {
  const colorScheme = useColorScheme() || "light";
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allExercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    setFilteredExercises(allExercises);
  }, [allExercises]);

  useLayoutEffect(() => {
    const fetchExercises = async () => {
      const data = await db.select().from(exercises);
      setExercises(data);
      navigation.setOptions({
        title: "All Exercises",
      });
    };
    fetchExercises();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="line.3.horizontal.decrease.circle"
          size={24}
          color="gray"
          onPress={() => setIsFilterOpen((prev) => !prev)}
        />
      ),
    });
  }, [isFilterOpen]);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <View className="p-3">
        {isFilterOpen && <ExerciseFilter />}
        <SearchBar
          style={styles.searchBar}
          className="border border-gray-300 rounded-lg"
          theme={colorScheme}
          placeholder="Search"
          onChangeText={(text) => {
            setSearchQuery(text);
            setFilteredExercises(
              allExercises.filter((exercise) =>
                exercise.name.toLowerCase().includes(text.toLowerCase())
              )
            );
          }}
          value={searchQuery}
          onCancel={() => {
            setSearchQuery("");
          }}
        />
      </View>
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => (
          <NewExerciseRow
            exercise={item}
            onPress={() => router.push(`/defaultExercise/${item.id}`)}
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
  searchBar: {
    width: "100%",
  },
});
