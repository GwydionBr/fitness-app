import { Link, Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderBackground from "@/components/ui/HeaderBackground";
import IconButton from "@/components/ui/IconButton";
import { useRouter } from "expo-router";

export default function StartLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();
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
              onPress={() => {
                router.push("/settings");
              }}
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
      <Stack.Screen
        name="(settings)/settings"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="(settings)/account"
        options={{
          title: "Account",
        }}
      />
    </Stack>
  );
}
