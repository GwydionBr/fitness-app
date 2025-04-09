import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface TrainingCategoryRowProps {
  category: string;
  onPress: () => void;
}

export default function TrainingCategoryRow({ category, onPress }: TrainingCategoryRowProps) {
  return (
  <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
    <ThemedText>{category}</ThemedText>
  </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  pressed: {
    opacity: 0.5,
  },
});
