import { StyleSheet } from "react-native";
import { TablesInsert } from "@/types/db.types";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface SetRowProps {
  set: TablesInsert<"training_set">;
  setIndex: number;
}

export default function SetRow({ set, setIndex }: SetRowProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>{setIndex + 1}</ThemedText>
      <ThemedText style={styles.text}>{set.repetitions}</ThemedText>
      <ThemedText style={styles.text}>{set.weight}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
