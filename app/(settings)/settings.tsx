import { StyleSheet } from 'react-native'
import React from 'react'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

const settings = () => {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedText>settings</ThemedText>
      <Link href="/(tabs)/(settings)/account" style={styles.link}>Go to account</Link>
      <Link href="/(tabs)/(workout)/workout" style={styles.link}>Go to workout</Link>
    </ThemedSafeAreaView>
  );
}

export default settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    color: '#fff',
    borderRadius: 5,
  }
})