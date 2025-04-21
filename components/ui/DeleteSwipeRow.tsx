import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import IconButton from "./IconButton";

interface DeleteSwipeRowProps {
  onDelete: () => void;
  size?: number;
  className?: string;
}

export default function DeleteSwipeRow({ onDelete, size = 20, className }: DeleteSwipeRowProps) {
  return (
    <View className={`flex-row justify-end items-center rounded-md w-full ${className}`}>
      <IconButton
        icon="trash"
        size={size}
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
