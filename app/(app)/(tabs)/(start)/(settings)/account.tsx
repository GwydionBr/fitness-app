import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { StyleSheet, View, Alert } from "react-native";
import Avatar from "@/components/Auth/Avatar";
import { useAuthStore } from "@/stores/AuthStore";
import Animated from "react-native-reanimated";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";
import { useRouter } from "expo-router";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";

export default function AccountScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const router = useRouter();
  const { session } = useAuthStore();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username || "");
        setWebsite(data.website || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedSafeAreaView className="p-5">
      <Animated.ScrollView>
        <View className="p-5">
          <View className="items-center w-42 h-42 rounded-full">
            <Avatar
              size={150}
              url={avatarUrl}
              onUpload={(url: string) => {
                setAvatarUrl(url);
                updateProfile({ username, website, avatar_url: url });
              }}
            />
          </View>
          <View className="border border-gray-300 rounded-lg p-5">
            <View className="mt-5">
              <ThemedInput
                label="Email"
                value={session?.user?.email}
                disabled
              />
            </View>
            <View className="mt-5">
              <ThemedInput
                label="Username"
                value={username || ""}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View className="mt-5">
              <ThemedInput
                label="Website"
                value={website || ""}
                onChangeText={(text) => setWebsite(text)}
              />
            </View>
          </View>
        </View>
        <View className="px-10">
          <View className="mt-10">
            <ThemedButton
              type="primary"
              withShadow
              onPress={() =>
                updateProfile({ username, website, avatar_url: avatarUrl })
              }
              isLoading={loading}
            >
              Update
            </ThemedButton>
          </View>

          <View className="mt-5">
            <ThemedButton
              textClassName="text-white"
              withShadow
              type="destructive"
              onPress={() => {
                supabase.auth.signOut();
                router.push("/auth");
              }}
            >
              Sign Out
            </ThemedButton>
          </View>
        </View>
      </Animated.ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({});
