import { StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText';
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView';

const workout = () => {
  return (
    <ThemedSafeAreaView>
      <ThemedText>workout</ThemedText>
    </ThemedSafeAreaView>
  );
}

export default workout

const styles = StyleSheet.create({})