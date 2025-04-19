import { View, Text, StyleSheet, FlatList } from "react-native";
import { db } from "@/db";
import { Exercise, exercises } from "@/db/schema";
import { useEffect, useState } from "react";

export default function AllNewExercises() {
  const [allExercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const data = await db.select().from(exercises);
      setExercises(data);
    };
    fetchExercises();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={allExercises}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
