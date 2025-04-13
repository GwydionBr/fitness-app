import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { useFitnessStore } from "@/stores/FitnessStore";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState, useEffect } from "react";
import { Tables } from "@/types/db.types";
import IconButton from "@/components/ui/IconButton";
import TrainingExerciseForm from "@/components/workout/TrainingExerciseForm";

export default function TrainingSessionDetail() {
  const { trainingSessionId } = useLocalSearchParams();
  const { deleteTrainingSession, getSessionData } = useFitnessStore();
  const navigation = useNavigation();
  const router = useRouter();
  const [trainingSession, setTrainingSession] =
    useState<Tables<"training_session"> | null>(null);
  const [trainingExercises, setTrainingExercises] = useState<
    Tables<"training_exercise">[]
  >([]);
  const [trainingSets, setTrainingSets] = useState<Tables<"training_set">[]>(
    []
  );

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionData = await getSessionData(trainingSessionId as string);
      setTrainingSession(sessionData.session);
      setTrainingExercises(sessionData.exercises);
      setTrainingSets(sessionData.sets);
    };
    fetchSessionData();
  }, [trainingSessionId, getSessionData]);

  const handleDeleteTrainingSession = () => {
    Alert.alert(
      "Delete Training Session",
      "Are you sure you want to delete this training session?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTrainingSession(trainingSessionId as string);
            router.back();
          },
        },
      ]
    );
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
        <FlatList
          data={trainingExercises}
          renderItem={({ item }) => (
            <TrainingExerciseForm
              workoutExercise={{
                trainingExercise: item,
                sets: trainingSets.filter(
                  (set) => set.training_exercise_id === item.id
                ),
              }}
              onSetChange={() => {}}
              onAddSet={() => {}}
              onDeleteSet={() => {}}
              onDeleteExercise={() => {}}
            />
          )}
        />
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
