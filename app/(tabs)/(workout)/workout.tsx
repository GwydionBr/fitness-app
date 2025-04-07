import { StyleSheet, ScrollView } from 'react-native'
import { ThemedText } from '@/components/ThemedText';
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView';
import WorkoutTimer from '@/components/workout/WorkoutTimer';
import ThemedPicker from '@/components/ThemedPicker';

const workout = () => {
  return (
    <ThemedSafeAreaView style={styles.rootContainer}>
      <WorkoutTimer seconds={3665} />
      <ScrollView>
        <ThemedText style={styles.text}>workout</ThemedText>
        {/* <ThemedPicker /> */}
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

export default workout

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 60,
  }
})