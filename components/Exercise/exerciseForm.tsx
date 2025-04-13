import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function ExerciseForm() {
  return (
    <View style={styles.container}>
      <ThemedText>Exercise Form</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});