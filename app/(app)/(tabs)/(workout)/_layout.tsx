import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderBackground from "@/components/ui/HeaderBackground";
import { useNavigation, useRouter } from "expo-router";
import IconButton from "@/components/ui/IconButton";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerBackground: () => <HeaderBackground />,
        headerTintColor: colorScheme === "dark" ? "#ECEDEE" : "#11181C",
      }}
    >
      <Stack.Screen name="workout" />
      <Stack.Screen
        name="addTrainingExercise"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
