import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleProp, StyleSheet, View, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedPickerProps<T> = {
  selectedValue: T;
  onValueChange: (itemValue: T, itemIndex: number) => void;
  items: { label: string; value: T }[];
  lightColor?: string;
  darkColor?: string;
  withBorder?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  pickerStyle?: StyleProp<ViewStyle>;
};

const ThemedPicker = <T extends unknown>({
  selectedValue,
  onValueChange,
  items,
  lightColor,
  darkColor,
  withBorder,
  label,
  style,
  labelStyle,
  pickerStyle,
}: ThemedPickerProps<T>) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputBackground"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputText"
  );

  return (
    <View style={[styles.rootContainer, style]}>
      {label && (
        <ThemedText style={[styles.label, labelStyle]}>{label}</ThemedText>
      )}
      <View
        style={[
          { backgroundColor },
          withBorder && { borderWidth: 1, borderColor: color },
          styles.pickerContainer,
          pickerStyle,
        ]}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={[styles.picker, { color }]}
          dropdownIconColor={color}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default ThemedPicker;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    width: "100%",
  },
  pickerContainer: {
    borderRadius: 8,
  },
  picker: {
    width: "100%",
  },
  label: {
    marginBottom: 5,
  },
});