import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import HeaderBackground from "@/components/ui/HeaderBackground";

export default function TabsLayout() {
  const tintColor = useThemeColor({}, "tabIconSelected");
  const tabBarActiveBackground = useThemeColor({}, "tabBarActiveBackground");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarActiveBackgroundColor: tabBarActiveBackground,
        headerShown: false,
        tabBarBackground: () => <HeaderBackground />,
        tabBarItemStyle: styles.tabBatItem,
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
  tabBatItem: {
    flex: 1,
    borderRadius: 30,
    overflow: "hidden",
  },
});
