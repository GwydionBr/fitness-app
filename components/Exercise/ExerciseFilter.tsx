import { View } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ExerciseFilter() {
  return (
    <View className="flex-row gap-2 mb-2">
      <View className="flex-1 justify-between items-center border-r-2 border-gray-400">
        <ThemedText className="text-sm font-bold">Muscle Group</ThemedText>
        <BouncyCheckbox
          size={14}
          fillColor="black"
          text="Filter"
          className="my-2"
          textStyle={{ fontSize: 14, fontWeight: "bold" }}
        />
      </View>
      <View className="flex-1 justify-between items-center border-r-2 border-gray-400">
        <ThemedText className="text-sm font-bold">Force</ThemedText>
        <BouncyCheckbox
          size={14}
          fillColor="black"
          text="Filter"
          className="my-2"
          textStyle={{ fontSize: 14, fontWeight: "bold" }}
        />
      </View>
      <View className="flex-1 justify-between items-center ">
        <ThemedText className="text-sm font-bold">Equipment</ThemedText>
        <BouncyCheckbox
          size={14}
          fillColor="black"
          text="Filter"
          className="my-2"
          textStyle={{ fontSize: 14, fontWeight: "bold" }}
        />
      </View>
    </View>
  );
}
