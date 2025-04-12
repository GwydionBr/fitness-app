import { Pressable, View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Tables } from "@/types/db.types";
import { useFitnessStore } from "@/stores/FitnessStore";
import { formatTime, formatTimeSpan, formatDate } from "@/utils/workHelperFunctions";

interface TrainingSessionRowProps {
  session: Tables<"training_session">;
  onPress: () => void;
}

export default function TrainingSessionRow({ session, onPress }: TrainingSessionRowProps) {
  const { categories, trainingSessionCategories } = useFitnessStore();

  const categoryId = trainingSessionCategories.find((c) => c.training_session_id === session.id);
  const category = categories.find((c) => c.id === categoryId?.categoy_id);

  const startTime = new Date(session.start_time);
  const endTime = new Date(session.end_time);

  const duration = endTime.getTime() - startTime.getTime();
  const durationInSeconds = duration / 1000;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <ThemedText>{formatDate(startTime)}</ThemedText>
      <ThemedText>{category?.title}</ThemedText>
      <ThemedText>{formatTimeSpan(startTime, endTime)}</ThemedText>
      <ThemedText>{formatTime(durationInSeconds)}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});