import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "@/stores/AuthStore";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <ThemedSafeAreaView className="flex-1 justify-center items-center">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </ThemedSafeAreaView>
    );
  }

  if (!session) {
    return <Redirect href="/auth" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
