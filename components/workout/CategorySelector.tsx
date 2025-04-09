import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import ThemedPicker from "@/components/ThemedPicker";
import { Button, StyleSheet, View } from "react-native";
import { Tables } from "@/types/db.types";

interface CategorySelectorProps {
  categories: Tables<"category">[];
  onSubmit: (category: Tables<"category">) => void;
}

const CategorySelector = ({ categories, onSubmit }: CategorySelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>Category Selector</ThemedText>
      <ThemedPicker
        selectedValue={selectedCategory}
        onValueChange={handleCategoryChange}
        items={categories.map((category) => ({
          label: category.title,
          value: category.id,
        }))}
        style={{ width: 350, marginTop: 20 }}
      />
      <Button
        title="Select Category"
        onPress={() => {
          const selected = categories.find(
            (category) => category.id === selectedCategory
          );
          if (selected) {
            onSubmit(selected);
          }
        }}
      />
    </View>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 60,
  },
});
