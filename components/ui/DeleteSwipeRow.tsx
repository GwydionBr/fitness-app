import { View, StyleSheet } from "react-native";
import { IconSymbol } from "./IconSymbol";
import IconButton from "./IconButton";

interface DeleteSwipeRowProps {
  onDelete: () => void;
}

export default function DeleteSwipeRow({ onDelete }: DeleteSwipeRowProps) {
  return (
    <View style={styles.rowBack}>
      <IconButton
        icon="trash"
        size={30}
        color="white"
        onPress={onDelete}
        buttonStyle={styles.deleteButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowBack: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    width: 100,
    paddingRight: 10,
    alignItems: "flex-end",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
