import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { formatTimerSeconds } from "@/utils/timeHelper";
import { useThemeStore } from "@/stores/ThemeStore";

const WorkoutTimer = ({ seconds }: { seconds: number }) => {
  const formatedTime = formatTimerSeconds(seconds);
  const { theme } = useThemeStore();

  return (
    <View
      className={`${
        theme === "light" ? "bg-blue-400" : "bg-blue-800"
      } w-36 rounded-md p-3 m-2 absolute top-4 z-10 items-center justify-center`}
    >
      <ThemedText className="text-white text-2xl font-bold">
        {formatedTime}
      </ThemedText>
    </View>
  );
};

export default WorkoutTimer;
