import { StyleSheet, View, Pressable, Animated } from "react-native";
import ThemedTextInput, { ThemedTextInputProps } from "../ThemedTextInput";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconSymbol } from "../ui/IconSymbol";

export default function PasswordInput(props: Omit<ThemedTextInputProps, "secureTextEntry">) {
  const [isSecure, setIsSecure] = useState(true);
  const iconColor = useThemeColor({}, "text");
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleSecure = () => {
    setIsSecure(!isSecure);
    Animated.spring(rotateAnim, {
      toValue: isSecure ? 1 : 0,
      useNativeDriver: true,
      tension: 20,
      friction: 7
    }).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <View style={styles.container}>
      <ThemedTextInput
        {...props}
        withBorder
        secureTextEntry={isSecure}
        style={[styles.input, props.style]}
      />
      <Pressable 
        style={styles.eyeButton}
        onPress={toggleSecure}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <IconSymbol 
            name={isSecure ? "eye.slash" : "eye"} 
            size={30} 
            weight={isSecure ? "bold" : "regular"}
            color={isSecure ? "grey" : "black"}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: "40%",
    transform: [{ translateY: -12 }],
  }
});
