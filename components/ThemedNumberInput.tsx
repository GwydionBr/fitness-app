import { StyleProp, StyleSheet, TextInput, TextStyle, type TextInputProps } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";

export type ThemedNumberInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  withBorder?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  onNumberChange?: (value: number) => void;
};

const ThemedNumberInput = ({
  style,
  lightColor,
  darkColor,
  withBorder,
  label,
  labelStyle,
  onNumberChange,
  ...otherProps
}: ThemedNumberInputProps) => {
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
    const numericValue = text.replace(/[^0-9.]/g, '');
    if (onNumberChange) {
      const number = parseFloat(numericValue) || 0;
      onNumberChange(number);
    }
    if (otherProps.onChangeText) {
      otherProps.onChangeText(numericValue);
    }
  };

  return (
    <>
      {label && <ThemedText style={[styles.label, labelStyle]}>{label}</ThemedText>}
      <TextInput
        style={[
          { backgroundColor, color },
          withBorder && { borderWidth: 1, borderColor: color },
          styles.input,
          style,
        ]}
        placeholderTextColor={placeholderColor}
        keyboardType="numeric"
        onChangeText={handleChangeText}
        {...otherProps}
      />
    </>
  );
};

export default ThemedNumberInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 10,
  },
  label: {
    marginBottom: 5,
  }
});
