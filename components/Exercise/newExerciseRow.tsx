import { View, StyleSheet, Pressable, Image } from "react-native";
import { ThemedText } from "../ThemedText";
import { Tables } from "@/types/db.types";
import { ThemedView } from "../ThemedView";
import { Exercise } from "@/db/schema";
import { getExerciseImage } from "@/utils/imageLoader";

interface NewExerciseRowProps {
  exercise: Exercise;
  categories?: Tables<"category">[];
  onPress?: () => void;
}

export default function NewExerciseRow({
  exercise,
  categories,
  onPress,
}: NewExerciseRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [onPress && pressed && styles.pressed]}
      onPress={onPress}
    >
      <ThemedView style={styles.container}>
        <View style={styles.upperRow}>
          <Image
            source={getExerciseImage(exercise.images[0])}
            style={styles.image}
          />
          {/* <ThemedText>{exercise.images[0]}</ThemedText> */}
          <ThemedText style={styles.text}>{exercise.name} </ThemedText>
          <ThemedText style={styles.text}>({exercise.primaryMuscles})</ThemedText>
          {/* {exercise.information && (
            <ThemedText style={styles.text}>
              ({exercise.information})
            </ThemedText>
          )} */}
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
