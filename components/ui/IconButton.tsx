import {
  StyleSheet,
  Pressable,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { IconSymbol, IconSymbolName } from "./IconSymbol";
import { useThemeStore } from "@/stores/ThemeStore";

interface IconButtonProps {
  icon: IconSymbolName;
  size: number;
  color?: string;
  colorDark?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  className?: string;
  withBorder?: boolean;
  disabled?: boolean;
}

const IconButton = ({
  icon,
  size,
  color,
  onPress,
  buttonStyle,
  className,
  withBorder,
  disabled,
}: IconButtonProps) => {
  const { theme } = useThemeStore();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[buttonStyle]}
      className={`active:opacity-75 p-2 ${disabled ? "opacity-50" : ""} ${
        withBorder
          ? `border-2 border-${
              theme === "light" ? "gray-300" : "gray-700"
            } rounded-md`
          : ""
      } ${className}`}
    >
      <IconSymbol name={icon} size={size} color={color ?? "black"} />
    </Pressable>
  );
};

export default IconButton;
