import { usePathname } from "expo-router";
import { StyleSheet } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { IconSymbol } from "@/components/ui/IconSymbol";
import HeaderBackground from "@/components/ui/HeaderBackground";

export default function TabsLayout() {
  const pathname = usePathname();

  return (
    <Tabs>
      <TabSlot />
      <TabList style={styles.tabList}>
        {/* <HeaderBackground style={styles.tabList}> */}
          <TabTrigger
            name="(analysis)"
            href="/analysis"
            style={[
              styles.tabTrigger,
              pathname === "/analysis"
                ? styles.tabTriggerActive
                : styles.tabTriggerInactive,
            ]}
          >
            <IconSymbol
              name="house.fill"
              color={pathname === "/analysis" ? "blue" : "black"}
              size={30}
            />
          </TabTrigger>
          <TabTrigger
            name="(workout)"
            href="/workout"
            style={[
              styles.tabTrigger,
              pathname === "/workout"
                ? styles.tabTriggerActive
                : styles.tabTriggerInactive,
            ]}
          >
            <IconSymbol
              name="plus"
              color={pathname === "/workout" ? "blue" : "black"}
              size={30}
            />
          </TabTrigger>
          <TabTrigger
            name="(settings)"
            href="/settings"
            style={[
              styles.tabTrigger,
              pathname === "/settings"
                ? styles.tabTriggerActive
                : styles.tabTriggerInactive,
            ]}
          >
            <IconSymbol
              name="gear"
              color={pathname === "/settings" ? "blue" : "black"}
              size={30}
            />
          </TabTrigger>
        {/* </HeaderBackground> */}
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
    paddingVertical: 10,
  },
  tabTriggerInactive: {
    // Stil für inaktive Tabs
  },
});
