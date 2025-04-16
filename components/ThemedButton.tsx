import {
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableStateCallbackType,
} from "react-native";
import { ReactNode } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "primary" | "secondary" | "outline";
  textStyle?: TextStyle;
  children: ReactNode;
};

export default function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "primary",
  textStyle,
  children,
  ...props
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    type === "primary"
      ? "primary"
      : type === "secondary"
      ? "secondary"
      : "background"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const getButtonStyle = (state: PressableStateCallbackType): ViewStyle => ({
    ...styles.button,
    backgroundColor,
    ...(type === "outline" && styles.outline),
    ...(state.pressed && styles.pressed),
    ...(style as ViewStyle),
  });

  return (
    <Pressable {...props} style={getButtonStyle}>
      <ThemedText style={[styles.text, { color: textColor }, textStyle]}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
