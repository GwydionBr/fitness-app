import React, { useState, useEffect } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import ThemedPicker from "@/components/ui/ThemedPicker";
import { Button, StyleSheet, View } from "react-native";
import { Tables } from "@/types/db.types";
import ThemedButton from "../ui/ThemedButton";

interface CategorySelectorProps {
  categories: Tables<"category">[];
  onSubmit: (category: Tables<"category">) => void;
}

const SelectTrainingCategory = ({
  categories,
  onSubmit,
}: CategorySelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

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
      <ThemedButton
        type="primary"
        className="my-5 p-3"
        onPress={() => {
          const selected = categories.find(
            (category) => category.id === selectedCategory
          );
          if (selected) {
            onSubmit(selected);
          }
        }}
      >
        Select Category
      </ThemedButton>
    </View>
  );
};

export default SelectTrainingCategory;

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
