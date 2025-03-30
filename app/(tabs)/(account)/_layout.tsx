import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderBackground from "@/components/ui/HeaderBackground";

export default function AccountLayout() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Stack
      screenOptions={{
        headerBackground: () => (
          <HeaderBackground />
        ),
        headerTintColor: colorScheme === "dark" ? "#ECEDEE" : "#11181C",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
