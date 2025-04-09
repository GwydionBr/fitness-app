import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderBackground from "@/components/ui/HeaderBackground";
import IconButton from "@/components/ui/IconButton";
import { useRouter } from "expo-router";

export default function AnalysisLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerBackground: () => <HeaderBackground />,
        headerTintColor: colorScheme === "dark" ? "#ECEDEE" : "#11181C",
        headerRight: () => (
          <IconButton
            icon="gear"
            size={24}
            color={colorScheme === "dark" ? "#ECEDEE" : "#11181C"}
            onPress={() => router.push("/settings")}
          />
        ),
      }}
    >
      <Stack.Screen
        name="analysis"
        options={{
          title: "Progress",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
