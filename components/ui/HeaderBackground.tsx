import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/hooks/useColorScheme";
import {ColorGradients, Colors} from "@/constants/Colors";

const HeaderBackground = () => {
  const colorScheme = useColorScheme() ?? "light";
  
  return (
    <LinearGradient
      colors={
        ColorGradients[colorScheme].headerBackground 
      }
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  );
};

export default HeaderBackground;
