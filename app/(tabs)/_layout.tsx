import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabsLayout() {
  const tintColor = useThemeColor({}, "tabIconSelected");
  const tabBarActiveBackground = useThemeColor({}, "tabBarActiveBackground");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarActiveBackgroundColor: tabBarActiveBackground,
        headerShown: false,
        tabBarItemStyle: styles.tabBatItem,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="(start)"
        options={{
          title: "Start",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="house.fill" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(workout)"
        options={{
          title: "Workout",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="dumbbell.fill" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(analysis)"
        options={{
          title: "Analysis",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="chart.xyaxis.line" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabBatItem: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
});
