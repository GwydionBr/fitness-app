import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { Tables } from "@/types/db.types";
import { ThemedView } from "../ui/ThemedView";

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
      style={({ pressed }) => [onPress && pressed && styles.pressed]}
      onPress={onPress}
    >
      <ThemedView style={styles.container}>
        <View style={styles.upperRow}>
          <ThemedText style={styles.text}>{exercise.title} </ThemedText>
          {exercise.information && (
            <ThemedText style={styles.text}>
              ({exercise.information})
            </ThemedText>
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
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 10,
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
    opacity: 0.7,
  },
});
