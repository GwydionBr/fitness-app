import { useState, useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

import {
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "../ThemedView";
import SearchBar from "react-native-platform-searchbar";
import ThemedSafeAreaView from "../ThemedSafeAreaView";

export interface Item {
  id: string;
  name: string;
}

interface ThemedSearchAndPickScreenProps {
  onClose: (item?: Item) => void;
  items: Item[];
  bottomSearchBar?: boolean;
}

export default function ThemedSearchAndPickScreen({
  onClose,
  items,
  bottomSearchBar = false,
}: ThemedSearchAndPickScreenProps) {
  const colorScheme = useColorScheme() || "light";
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleClose = (item?: Item) => {
    onClose(item);
    setSearchQuery("");
    setFilteredItems(items);
  };

  const renderSearchBar = () => {
    return (
      <SearchBar
        style={styles.searchBar}
        theme={colorScheme}
        placeholder="Search"
        onChangeText={(text) => {
          setSearchQuery(text);
          setFilteredItems(
            items.filter((item) =>
              item.name.toLowerCase().includes(text.toLowerCase())
            )
          );
        }}
        value={searchQuery}
        onCancel={() => {
          setSearchQuery("");
        }}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoid}
    >
      <ThemedSafeAreaView style={{ flex: 1 }}>
        <ThemedView style={styles.modalContainer}>
          {!bottomSearchBar && renderSearchBar()}
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1 },
                  styles.itemRow,
                ]}
                onPress={() => handleClose(item)}
              >
                <ThemedText>{item.name}</ThemedText>
              </Pressable>
            )}
            style={[
              styles.list,
              bottomSearchBar ? { marginBottom: 30 } : { marginTop: 20 },
            ]}
            inverted={bottomSearchBar}
          />
          {bottomSearchBar && renderSearchBar()}
        </ThemedView>
      </ThemedSafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  searchBar: {
    width: "100%",
  },
  itemRow: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
});
