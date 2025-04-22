import {
  Pressable,
  PressableProps,
  TextStyle,
  Text,
  ActivityIndicator,
} from "react-native";
import { ReactNode } from "react";
import { useThemeStore } from "@/stores/ThemeStore";
export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "primary"
    | "secondary"
    | "outline"
    | "destructive"
    | "success"
    | "warning";
  textStyle?: TextStyle;
  children: ReactNode;
  className?: string;
  textClassName?: string;
  isLoading?: boolean;
  disabled?: boolean;
  withShadow?: boolean;
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
  withShadow = false,
  ...props
}: ThemedButtonProps) {
  const { theme } = useThemeStore();
  const styleType = {
    dark: {
      text: {
        primary: "text-white",
        secondary: "text-gray-100",
        outline: "text-indigo-400",
        disabled: "text-gray-500",
        destructive: "text-white",
        success: "text-white",
        warning: "text-gray-900",
      },
      button: {
        primary: "bg-indigo-600",
        secondary: "bg-gray-700",
        outline: "border-indigo-400 border-2",
        disabled: "bg-gray-600",
        destructive: "bg-red-600",
        success: "bg-emerald-600",
        warning: "bg-amber-400",
      },
      shadow: {
        primary: "shadow-indigo-600 shadow-lg",
        secondary: "shadow-gray-700 shadow-lg",
        outline: "shadow-indigo-400 shadow-lg",
        disabled: "shadow-gray-600 shadow-lg",
        destructive: "shadow-red-600 shadow-lg",
        success: "shadow-emerald-600 shadow-lg",
        warning: "shadow-amber-400 shadow-lg",
      },
    },
    light: {
      text: {
        primary: "text-white",
        secondary: "text-gray-700",
        outline: "text-indigo-600",
        disabled: "text-gray-400",
        destructive: "text-white",
        success: "text-white",
        warning: "text-gray-900",
      },
      button: {
        primary: "bg-indigo-600",
        secondary: "bg-gray-200",
        outline: "border-indigo-600 border-2",
        disabled: "bg-gray-300",
        destructive: "bg-red-600",
        success: "bg-emerald-600",
        warning: "bg-amber-400",
      },
      shadow: {
        primary: "shadow-indigo-600 shadow-lg",
        secondary: "shadow-gray-700 shadow-lg",
        outline: "shadow-indigo-400 shadow-lg",
        disabled: "shadow-gray-600 shadow-lg",
        destructive: "shadow-red-600 shadow-lg",
        success: "shadow-emerald-600 shadow-lg",
        warning: "shadow-amber-400 shadow-lg",
      },
    },
  };

  return (
    <Pressable
      {...props}
      style={style}
      disabled={isLoading || disabled}
      className={`flex-row active:opacity-75 rounded-lg align-middle justify-center p-2 ${
        styleType[theme].button[type]
      } ${withShadow && styleType[theme].shadow[type]} ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={styleType[theme].text[type]} />
      ) : (
        <Text
          className={`${styleType[theme].text[type]} ${textClassName}`}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
