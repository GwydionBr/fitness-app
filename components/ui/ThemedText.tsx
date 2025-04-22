import { Text, type TextProps } from "react-native";

import { useThemeStore } from "@/stores/ThemeStore";
import { useEffect, useState } from "react";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  className?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const { theme } = useThemeStore();
  const [color, setColor] = useState("text-black");
  
  const styleType = {
    default: "text-base leading-6 text-l",
    title: "text-3xl font-bold leading-8",
    defaultSemiBold: "text-base leading-6 font-semibold",
    subtitle: "text-xl font-bold",
    link: "leading-[30px] text-base text-[#0a7ea4]",
  };  

  const styleTheme = {
    light: {
      text: "text-black",
    },
    dark: {
      text: "text-white",
    },
  };

  useEffect(() => {
    setColor(styleTheme[theme].text);
  }, [theme]);

  return (
    <Text
      className={`${styleType[type]} ${color} ${className}`}
      style={style}
      {...rest}
    />
  );  
}
