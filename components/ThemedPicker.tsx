import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleProp, StyleSheet, View, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "./ThemedView";

export type ThemedPickerProps<T> = {
  selectedValue: T;
  onValueChange: (itemValue: T, itemIndex: number) => void;
  items: { label: string; value: T }[];
  lightColor?: string;
  darkColor?: string;
  withBorder?: boolean;
  label?: string;
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
    <ThemedView>
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
    </ThemedView>
  );
};

export default ThemedPicker;

const styles = StyleSheet.create({
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