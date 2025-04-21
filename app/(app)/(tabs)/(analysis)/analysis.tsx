import { StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import { ThemedText } from '@/components/ThemedText';
import { useFitnessStore } from '@/stores/FitnessStore';
import TrainingSessionRow from '@/components/analysis/trainingSessionRow';
import { router } from 'expo-router';

const index = () => {
  const { trainingSessions, isFetching } = useFitnessStore();

  if (isFetching) {
    return (
      <ThemedSafeAreaView>
        <ThemedText>Loading...</ThemedText>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView>
      <FlatList
        data={trainingSessions}
        style={styles.sessionList}
        keyExtractor={(item) => item.id}
        renderItem={({ item: trainingSession }) => (
          <TrainingSessionRow session={trainingSession} onPress={() => router.push(`/(tabs)/(analysis)/${trainingSession.id}`)} />
        )}
        ListEmptyComponent={<ThemedText>No categories found</ThemedText>}
        />
    </ThemedSafeAreaView>
  );
}

export default index

const styles = StyleSheet.create({
  sessionList: {
    flex: 1,
    marginTop: 10,
  },
})