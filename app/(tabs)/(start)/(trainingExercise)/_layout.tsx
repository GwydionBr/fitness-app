import { Stack } from "expo-router";

export default function TrainingExerciseLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="allExercises" />
    </Stack>
  );
}