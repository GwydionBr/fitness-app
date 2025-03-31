import { StyleSheet } from 'react-native'
import React from 'react'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import { ThemedText } from '@/components/ThemedText';

const index = () => {
  return (
    <ThemedSafeAreaView>
      <ThemedText>index</ThemedText>
    </ThemedSafeAreaView>
  );
}

export default index

const styles = StyleSheet.create({})