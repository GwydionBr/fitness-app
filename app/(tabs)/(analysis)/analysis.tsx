import { StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import { ThemedText } from '@/components/ThemedText';
import { useFitnessStore } from '@/stores/FitnessStore';

const index = () => {
  const { categories } = useFitnessStore();
  return (
    <ThemedSafeAreaView>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedText>
            {item.title}
          </ThemedText>
        )}
        ListEmptyComponent={<ThemedText>No categories found</ThemedText>}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        />
    </ThemedSafeAreaView>
  );
}

export default index

const styles = StyleSheet.create({})