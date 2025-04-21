import {
  Pressable,
  PressableProps,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { ReactNode } from "react";
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
  isLoading?: boolean;
  disabled?: boolean;
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
  isLoading = false,
  disabled = false,
  ...props
}: ThemedButtonProps) {
  const { theme } = useThemeStore();
  const styleType = {
    dark: {
      text: {
        primary: "text-white",
        secondary: "text-white",
        outline: "text-black",
        disabled: "text-gray-400",
        destructive: "text-white",
      },
      button: {
        primary: "bg-orange-500",
        secondary: "bg-gray-800",
        outline: "border-gray-200 border-2",
        disabled: "bg-gray-400",
        destructive: "bg-red-500",
      },
    },
    light: {
      text: {
        primary: "text-black",
        secondary: "text-black",
        outline: "text-black",
        disabled: "text-gray-400",
        destructive: "text-white",
      },
      button: {
        primary: "bg-orange-500",
        secondary: "bg-gray-300",
        outline: " border-gray-900 border-2",
        disabled: "bg-gray-400",
        destructive: "bg-red-500",
      },
    },
  };

  return (
    <Pressable
      {...props}
      style={style}
      disabled={isLoading || disabled}
      className={`flex-row active:opacity-75 rounded-lg align-middle justify-center p-2 ${styleType[theme].button[type]} ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={styleType[theme].text[type]} />
      ) : (
        <ThemedText className={`${styleType[theme].text[type]} ${textClassName}`}>
          {children}
        </ThemedText>
      )}
    </Pressable>
  );
}
