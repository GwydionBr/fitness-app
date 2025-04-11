import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  type TextInputProps,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  withBorder?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  inputType?: "text" | "number";
  onNumberChange?: (value: number) => void;
};

const ThemedInput = ({
  style,
  lightColor,
  darkColor,
  withBorder,
  label,
  labelStyle,
  inputType = "text",
  onNumberChange,
  ...otherProps
}: ThemedInputProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputBackground"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputText"
  );
  const placeholderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputPlaceholder"
  );

  const handleChangeText = (text: string) => {
    if (inputType === "number") {
      const numericValue = text.replace(/[^0-9.]/g, "");
      if (onNumberChange) {
        const number = parseFloat(numericValue) || 0;
        onNumberChange(number);
      }
      if (otherProps.onChangeText) {
        otherProps.onChangeText(numericValue);
      }
    } else if (otherProps.onChangeText) {
      otherProps.onChangeText(text);
    }
  };

  return (
    <>
      {label && (
        <ThemedText style={[styles.label, labelStyle]}>{label}</ThemedText>
      )}
      <TextInput
        style={[
          { backgroundColor, color },
          withBorder && { borderWidth: 1, borderColor: color },
          styles.input,
          style,
        ]}
        placeholderTextColor={placeholderColor}
        keyboardType={inputType === "number" ? "numeric" : "default"}
        onChangeText={handleChangeText}
        {...otherProps}
      />
    </>
  );
};

export default ThemedInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 10,
  },
  label: {
    marginBottom: 5,
  },
});
