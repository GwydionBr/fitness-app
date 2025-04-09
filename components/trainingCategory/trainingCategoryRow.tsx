import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface TrainingCategoryRowProps {
  category: string;
}

export default function TrainingCategoryRow({ category }: TrainingCategoryRowProps) {
  return (
  <View style={styles.container}>
    <ThemedText>{category}</ThemedText>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
