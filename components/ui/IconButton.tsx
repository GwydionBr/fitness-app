import { StyleSheet, Pressable, View, StyleProp, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const IconButton = ({ icon, size, color, onPress, buttonStyle } : IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.buttonContainer, buttonStyle]}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.8,
  },
});
