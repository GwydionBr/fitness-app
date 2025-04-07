import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";

const CategorySelector = () => {
  const [selectedIndex, setSelectedIndex] = useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  return (
    <Layout style={styles.container} level="1">
      <Select
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <SelectItem title="Option 1" />
        <SelectItem title="Option 2" />
        <SelectItem title="Option 3" />
      </Select>
    </Layout>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
});
