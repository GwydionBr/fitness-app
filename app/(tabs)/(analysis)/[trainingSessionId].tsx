import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useFitnessStore } from "@/stores/FitnessStore";

export default function TrainingSessionDetail() {
  const { trainingSessionId } = useLocalSearchParams();

  const { trainingSessions } = useFitnessStore();

  const trainingSession = trainingSessions.find((session) => session.id === trainingSessionId);

  return (
    <ThemedSafeAreaView>
      <View style={styles.container}>
        <ThemedText>{trainingSession?.start_time}</ThemedText>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
