import { StyleSheet } from 'react-native'
import React from 'react'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import { ThemedText } from '@/components/ThemedText';

const settings = () => {
  return (
    <ThemedSafeAreaView>
      <ThemedText>settings</ThemedText>
    </ThemedSafeAreaView>
  );
}

export default settings

const styles = StyleSheet.create({})