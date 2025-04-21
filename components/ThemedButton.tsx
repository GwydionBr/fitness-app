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
import { useThemeStore } from "@/stores/ThemeStore";
export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "primary" | "secondary" | "outline";
  textStyle?: TextStyle;
  children: ReactNode;
  className?: string;
  textClassName?: string;
};

export default function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "primary",
  textStyle,
  children,
  className,
  textClassName,
  ...props
}: ThemedButtonProps) {
  const { theme } = useThemeStore();
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

  const styleType = {
    dark: {
      text: {
        primary: "text-white",
        secondary: "text-white",
        outline: "text-black",
      },
      button: {
        primary: "bg-orange-500",
        secondary: "bg-gray-800",
        outline: "border-gray-200 border-2",
      },
    },
    light: {
      text: {
        primary: "text-black",
        secondary: "text-black",
        outline: "text-black",
      },
      button: {
        primary: "bg-orange-500",
        secondary: "bg-gray-300",
        outline: " border-gray-900 border-2",
      },
    },
  };

  return (
    <Pressable
      {...props}
      style={style}
      className={`flex-row rounded-lg align-middle justify-center p-2 ${styleType[theme].button[type]} ${className}`}
    >
      <ThemedText className={`${styleType[theme].text[type]} ${textClassName}`}>
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
