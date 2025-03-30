import { StyleProp, StyleSheet, TextInput, TextStyle, type TextInputProps } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  withBorder?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
};

const ThemedTextInput = ({
  style,
  lightColor,
  darkColor,
  withBorder,
  label,
  labelStyle,
  ...otherProps
}: ThemedTextInputProps) => {
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
        {...otherProps}
      />
    </>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 10,
  },
  label: {
    marginBottom: 5,
  }
});
