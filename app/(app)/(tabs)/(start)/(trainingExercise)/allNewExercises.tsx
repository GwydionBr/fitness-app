import { StyleSheet, useColorScheme, FlatList } from "react-native";
import { db } from "@/db";
import { Exercise, exercises } from "@/db/schema";
import { useEffect, useState } from "react";
import SearchBar from "react-native-platform-searchbar";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import NewExerciseRow from "@/components/Exercise/newExerciseRow";

export default function AllNewExercises() {
  const colorScheme = useColorScheme() || "light";
  const [searchQuery, setSearchQuery] = useState("");
  const [allExercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    setFilteredExercises(allExercises);
  }, [allExercises]);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await db.select().from(exercises);
      setExercises(data);
    };
    fetchExercises();
  }, []);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <SearchBar
        style={styles.searchBar}
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
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => <NewExerciseRow exercise={item} />}
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
