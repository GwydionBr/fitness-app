import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { Tables } from "@/types/db.types";
import { useFitnessStore } from "@/stores/FitnessStore";
import {
  formatTime,
  formatTimeSpan,
  formatDate,
} from "@/utils/workHelperFunctions";

interface TrainingSessionRowProps {
  session: Tables<"training_session">;
  onPress: () => void;
}

export default function TrainingSessionRow({
  session,
  onPress,
}: TrainingSessionRowProps) {
  const { categories, trainingSessionCategories } = useFitnessStore();

  const categoryId = trainingSessionCategories.find(
    (c) => c.training_session_id === session.id
  );
  const category = categories.find((c) => c.id === categoryId?.categoy_id);

  const startTime = new Date(session.start_time);
  const endTime = new Date(session.end_time);

  const duration = endTime.getTime() - startTime.getTime();
  const durationInSeconds = duration / 1000;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row justify-between items-center border border-gray-300 rounded-md p-2 m-2 active:opacity-75"
    >
      <ThemedText>{formatDate(startTime)}</ThemedText>
      <ThemedText>{category?.title}</ThemedText>
      <View style={styles.timeContainer}>
        <ThemedText style={styles.timeSpanText}>
          {formatTimeSpan(startTime, endTime)}
        </ThemedText>
        <ThemedText style={styles.minutesText}>
          {formatTime(durationInSeconds)}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.5,
  },
  timeContainer: {
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "gray",
  },
  timeSpanText: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: 130,
    textAlign: "center",
    paddingVertical: 5,
  },
  minutesText: {
    textAlign: "center",
    paddingVertical: 5,
  },
});
