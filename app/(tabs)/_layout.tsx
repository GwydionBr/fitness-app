import { StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabsLayout() {
  const [activeTab, setActiveTab] = useState("workout");
  const shadowColor = useThemeColor({}, "shadow");

  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.tabList, { shadowColor }]}>
        <TabTrigger
          onPress={() => {
            setActiveTab("start");
          }}
          name="(start)"
          href="/start"
          style={[
            styles.tabTrigger,
            activeTab === "start"
              ? styles.tabTriggerActive
              : styles.tabTriggerInactive,
          ]}
        >
          <IconSymbol
            name="house.fill"
            color={activeTab === "start" ? "blue" : "black"}
            size={35}
          />
        </TabTrigger>
        <TabTrigger
          onPress={() => {
            setActiveTab("workout");
          }}
          name="(workout)"
          href="/workout"
          style={[
            styles.tabTrigger,
            activeTab === "workout"
              ? styles.tabTriggerActive
              : styles.tabTriggerInactive,
          ]}
        >
          <IconSymbol
            name="dumbbell.fill"
            color={activeTab === "workout" ? "blue" : "black"}
            size={35}
          />
        </TabTrigger>
        <TabTrigger
          onPress={() => {
            setActiveTab("analysis");
          }}
          name="(analysis)"
          href="/analysis"
          style={[
            styles.tabTrigger,
            activeTab === "analysis"
              ? styles.tabTriggerActive
              : styles.tabTriggerInactive,
          ]}
        >
          <IconSymbol
            name="chart.xyaxis.line"
            color={activeTab === "analysis" ? "blue" : "black"}
            size={35}
          />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    height: 60,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
    backgroundColor: "rgb(255, 146, 3)",
  },
  tabTrigger: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabTriggerActive: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    paddingVertical: 15,
  },
  tabTriggerInactive: {
    // Stil für inaktive Tabs
  },
});
