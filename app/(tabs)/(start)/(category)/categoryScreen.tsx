import { StyleSheet, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useFitnessStore } from "@/stores/FitnessStore";
import TrainingCategoryRow from "@/components/trainingCategory/trainingCategoryRow";
import NewTrainingCategoryInput from "@/components/trainingCategory/newTrainingCategoryInput";
import { useRouter } from "expo-router";

export default function CategoryScreen() {
  const { categories } = useFitnessStore();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <NewTrainingCategoryInput />
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TrainingCategoryRow category={item.title} onPress={() => {
            router.push(`/(tabs)/(start)/(category)/${item.id}`);
          }} />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
});
