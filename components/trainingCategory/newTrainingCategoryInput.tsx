import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useFitnessStore } from '@/stores/FitnessStore';
import { ThemedView } from '../ThemedView';
import ThemedTextInput from '../ThemedTextInput';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function NewTrainingCategoryInput() {
  const [categoryName, setCategoryName] = useState('');
  const { createCategory } = useFitnessStore();
  const iconColor = useThemeColor({}, 'text');
  const shadowColor = useThemeColor({}, 'shadow');

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      createCategory({ title: categoryName.trim() });
      setCategoryName('');
    }
  };

  return (
    <ThemedView style={[styles.container, { shadowColor, borderColor: shadowColor }]}>
      <ThemedTextInput
        style={styles.input}
        value={categoryName}
        onChangeText={setCategoryName}
        placeholder="New Training Category"
      />
      <Pressable 
        style={styles.addButton}
        onPress={handleAddCategory}
      >
        <FontAwesome name="plus" size={20} color={iconColor} />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    backgroundColor: 'transparent',
  },
  addButton: {
    padding: 10,
  }
});