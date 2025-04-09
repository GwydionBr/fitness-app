import {
  StyleSheet,
  Pressable,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { IconSymbol, IconSymbolName } from "./IconSymbol";

interface IconButtonProps {
  icon: IconSymbolName;
  size: number;
  color?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const IconButton = ({
  icon,
  size,
  color,
  onPress,
  buttonStyle,
}: IconButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.buttonContainer, buttonStyle]}>
        <IconSymbol name={icon} size={size} color={color ?? "black"} />
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
