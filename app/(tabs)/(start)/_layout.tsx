import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderBackground from "@/components/ui/HeaderBackground";
import IconButton from "@/components/ui/IconButton";

export default function StartLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Stack
      screenOptions={{
        headerBackground: () => <HeaderBackground />,
        headerTintColor: colorScheme === "dark" ? "#ECEDEE" : "#11181C",
      }}
    >
      <Stack.Screen
        name="start"
        options={{
          title: "Start",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerRight: () => (
            <IconButton
              icon="gear"
              size={24}
              color={colorScheme === "dark" ? "#ECEDEE" : "#11181C"}
              onPress={() => {}}
            />
          ),
        }}
      />
      <Stack.Screen
        name="(category)/categoryScreen"
        options={{
          title: "Your Categories",
        }}
      />
      <Stack.Screen
        name="(trainingExercise)"
        options={{
          title: "Your Exercises",
        }}
      />
    </Stack>
  );
}
