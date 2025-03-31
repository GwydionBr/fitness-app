import { useState } from "react";
import { StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { IconSymbol } from "@/components/ui/IconSymbol";
import HeaderBackground from "@/components/ui/HeaderBackground";

export default function TabsLayout() {
  const [activeTab, setActiveTab] = useState("analysis");

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <HeaderBackground style={styles.tabList}>
          <TabTrigger
            name="(analysis)"
            href="/(tabs)/(analysis)"
            onPress={() => handleTabPress("(analysis)")}
            style={[
              styles.tabTrigger,
              activeTab === "(analysis)"
                ? styles.tabTriggerActive
                : styles.tabTriggerInactive,
            ]}
          >
            <IconSymbol name="house.fill" color={"black"} size={30} />
          </TabTrigger>
          <TabTrigger
            name="(workout)"
            href="/workout"
            onPress={() => handleTabPress("(workout)")}
            style={[
              styles.tabTrigger,
              activeTab === "(workout)"
                ? styles.tabTriggerActive
                : styles.tabTriggerInactive,
            ]}
          >
            <IconSymbol name="plus" color={"black"} size={30} />
          </TabTrigger>
          <TabTrigger
            name="(settings)"
            href="/settings"
            onPress={() => handleTabPress("(settings)")}
            style={[
              styles.tabTrigger,
              activeTab === "(settings)"
                ? styles.tabTriggerActive
                : styles.tabTriggerInactive,
            ]}
          >
            <IconSymbol name="gear" color={"black"} size={30} />
          </TabTrigger>
        </HeaderBackground>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    position: "absolute",
    bottom: 40,
    left: 50,
    right: 50,
    height: 50,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "",
    padding: 5,
  },
  tabTrigger: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabTriggerActive: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    paddingVertical: 10,
  },
  tabTriggerInactive: {


  },
});
