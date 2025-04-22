import React from "react";
import MultiSelect from "react-native-multiple-select";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
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
  mainStyle?: StyleProp<ViewStyle>;
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
  mainStyle,
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
  const buttonColor = useThemeColor({}, "primary");
  const secondaryTextColor = useThemeColor({}, "secondaryText");

  return (
    <View style={[styles.rootContainer, style]}>
      {label && (
        <ThemedText style={[styles.label, labelStyle]}>{label}</ThemedText>
      )}
      <MultiSelect
        items={items}
        single={single}
        uniqueKey="id"
        displayKey="name"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Kategorien"
        searchInputPlaceholderText="Suche eine Kategorie..."
        styleMainWrapper={[
          { backgroundColor },
          styles.mainWrapper,
          withBorder && { borderWidth: 1, borderColor: color },
          mainStyle,
        ]}
        styleDropdownMenu={[styles.dropdownMenu, { borderColor: color }]}
        styleDropdownMenuSubsection={[
          styles.dropdownMenuSubsection,
          { backgroundColor },
        ]}
        // searchInputStyle={[styles.searchInput]}
        styleIndicator={[styles.indicator]}
        styleInputGroup={[
          styles.inputGroup,
          { backgroundColor, borderColor: color },
        ]}
        styleItemsContainer={[styles.itemsContainer, { backgroundColor }]}
        styleListContainer={styles.listContainer}
        styleRowList={[styles.rowList, { borderColor: color }]}
        styleSelectorContainer={[styles.selectorContainer]}
        styleTextDropdown={[styles.textDropdown, { color: secondaryTextColor }]}
        styleTextDropdownSelected={[
          styles.textDropdownSelected,
          { color: secondaryTextColor },
        ]}
        tagBorderColor={color}
        tagTextColor={color}
        selectedItemTextColor={color}
        selectedItemIconColor={color}
        itemTextColor={secondaryTextColor}
        submitButtonColor={buttonColor}
        {...otherProps}
      />
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
  mainWrapper: {
    padding: 10,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },

  // Ausgeklappt
  selectorContainer: {
    // borderWidth: 1,
    // borderColor: "red",
  },
  searchInput: {
    // backgroundColor: "blue",
  },

  // Input
  inputGroup: {
    padding: 9,
    borderWidth: 1,
    borderRadius: 8,
  },

  // List
  itemsContainer: {
    // borderWidth: 2,
    // borderColor: "red",
    padding: 10,
  },
  rowList: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    marginVertical: 2,
  },
  listContainer: {
    // borderRadius: 8,
    // borderWidth: 2,
    // borderColor: "orange",
  },

  // Dropdown Menu
  dropdownMenu: {
    // backgroundColor: "orange",
    overflow: "hidden",
    paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: "red",
  },
  textDropdown: {
    // backgroundColor: "red",
  },
  textDropdownSelected: {
    // backgroundColor: "blue",
  },
  indicator: {
    // backgroundColor: "red",
    left: 15,
    height: 30,
  },

  // Some other styles
  dropdownMenuSubsection: {
    // backgroundColor: "purple",
  },
});

export default ThemedMultipleSelect;
