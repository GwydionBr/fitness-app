import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { Tables } from "@/types/db.types";

interface ExerciseRowProps {
  exercise: Tables<"exercise">;
  categories?: Tables<"category">[];
  onPress?: () => void;
}

export default function ExerciseRow({
  exercise,
  categories,
  onPress,
}: ExerciseRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        onPress && pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.upperRow}>
        <ThemedText style={styles.text}>{exercise.title} </ThemedText>
        {exercise.information && (
          <ThemedText style={styles.text}>({exercise.information})</ThemedText>
        )}
      </View>
      {categories && (
        <View style={styles.categories}>
          <ThemedText
            lightColor="gray"
            darkColor="gray"
            style={styles.categoryText}
          >
            {categories.map((category) => category.title).join(", ")}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 20,
  },
  upperRow: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 12,
  },
  pressed: {
    opacity: 0.5,
  },
});
