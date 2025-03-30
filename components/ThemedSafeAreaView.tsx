import { PropsWithChildren } from 'react'
import { StyleSheet, SafeAreaView, type ViewProps } from 'react-native'
import { ThemedView } from './ThemedView'
import { View } from 'react-native-reanimated/lib/typescript/Animated';

type ThemedSafeAreaViewProps = ViewProps & PropsWithChildren & {
  style?: ViewProps['style']
}

const ThemedSafeAreaView = ({ children, style }: ThemedSafeAreaViewProps) => {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </ThemedView>
  );
};

export default ThemedSafeAreaView

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})