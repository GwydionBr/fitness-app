import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Alert } from "react-native";
import { useFitnessStore } from "@/stores/FitnessStore";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState, useEffect } from "react";
import { Tables } from "@/types/db.types";
import IconButton from "@/components/ui/IconButton";

export default function TrainingSessionDetail() {
  const { trainingSessionId } = useLocalSearchParams();
  const { trainingSessions, deleteTrainingSession } = useFitnessStore();
  const navigation = useNavigation();
  const router = useRouter();
  const [trainingSession, setTrainingSession] =
    useState<Tables<"training_session"> | null>(null);

  useEffect(() => {
    const session = trainingSessions.find(
      (session) => session.id === trainingSessionId
    );
    setTrainingSession(session || null);
  }, [trainingSessionId, trainingSessions]);

  const handleDeleteTrainingSession = () => {
    Alert.alert("Delete Training Session", "Are you sure you want to delete this training session?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
          deleteTrainingSession(trainingSessionId as string);
          router.back();
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Training Session",
      headerRight: ({
        tintColor,
        size,
      }: {
        tintColor: string;
        size: number;
      }) => (
        <IconButton
          icon="trash"
          size={size}
          color={tintColor}
          onPress={handleDeleteTrainingSession}
        />
      ),
    });
  }, [navigation]);

  if (!trainingSession) {
    return <ThemedText>Training session not found</ThemedText>;
  }

  return (
    <ThemedSafeAreaView>
      <View style={styles.container}>
        <ThemedText>{trainingSession.start_time}</ThemedText>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
