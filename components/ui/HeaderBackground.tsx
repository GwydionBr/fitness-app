import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ColorGradients } from "@/constants/Colors";
import { PropsWithChildren } from "react";
import { ViewProps } from "react-native";

const HeaderBackground = ({
  children,
  style,
}: PropsWithChildren & ViewProps) => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <LinearGradient
      colors={ColorGradients[colorScheme].headerBackground}
      style={[{ flex: 1 }, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {children}
    </LinearGradient>
  );
};

export default HeaderBackground;
