import React from "react";
import MultiSelect from "react-native-multiple-select";
import { StyleProp, StyleSheet, View, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedMultipleSelectProps<T> = {
  selectedItems: T[];
  onSelectedItemsChange: (selectedItems: T[]) => void;
  items: { name: string; id: T }[];
  lightColor?: string;
  darkColor?: string;
  withBorder?: boolean;
  single?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  selectStyle?: StyleProp<ViewStyle>;
};

const ThemedMultipleSelect = <T extends unknown>({
  selectedItems,
  onSelectedItemsChange,
  items,
  lightColor,
  darkColor,
  withBorder,
  single,
  label,
  style,
  labelStyle,
  selectStyle,
  ...otherProps
}: ThemedMultipleSelectProps<T>) => {
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
          styles.selectContainer,
          selectStyle,
        ]}
      >
        <MultiSelect
          items={items}
          single={single}
          uniqueKey="id"
          displayKey="name"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick items"
          searchInputPlaceholderText="Search Items..."
          styleMainWrapper={styles.multiSelect}
          styleDropdownMenuSubsection={[
            styles.dropdownMenuSubsection,
            { backgroundColor, borderColor: color },
          ]}
          tagRemoveIconColor={color}
          tagBorderColor={color}
          tagTextColor={color}
          selectedItemTextColor={color}
          selectedItemIconColor={color}
          itemTextColor={color}
          searchInputStyle={{ color }}
          submitButtonColor={color}
          styleTextDropdown={{ color }}
          styleTextDropdownSelected={{ color }}
          {...otherProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: "100%",
    flex: 1,
  },
  label: {
    marginBottom: 8,
  },
  selectContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  multiSelect: {
    width: "100%",
  },
  dropdownMenuSubsection: {
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ThemedMultipleSelect;
