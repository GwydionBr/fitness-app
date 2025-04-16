const tintColorLight = 'rgb(0, 0, 0)';
const tintColorDark = 'rgb(255, 255, 255)';

export const Colors = {
  light: {
    text: "rgb(17, 24, 28)",
    secondaryText: "rgb(104, 112, 118)",
    background: "rgb(255, 255, 255)",
    tint: tintColorLight,
    icon: "rgb(104, 112, 118)",
    tabIconDefault: "rgb(104, 112, 118)", 
    tabIconSelected: tintColorLight,
    tabBarActiveBackground: "rgb(185, 207, 138)",
    headerTintColor: "rgb(17, 24, 28)",
    inputBackground: "rgb(240, 240, 240)",
    inputPlaceholder: "rgb(136, 136, 136)",
    inputText: "rgb(17, 24, 28)",
    shadow: "rgb(0, 0, 0)",
    expenseRow: "rgb(248, 215, 218)",
    incomeRow: "rgb(212, 237, 218)",
    newTest: "rgba(255, 255, 255, 0.1)",
    primary: "rgb(211, 159, 18)",
    secondary: "rgb(168, 194, 23)",
  },
  dark: {
    text: "rgb(236, 237, 238)",
    secondaryText: "rgb(155, 161, 166)",
    background: "rgb(21, 23, 24)",
    tint: tintColorDark,
    icon: "rgb(155, 161, 166)",
    tabIconDefault: "rgb(155, 161, 166)",
    tabIconSelected: tintColorDark,
    tabBarActiveBackground: "rgb(34, 34, 34)",
    headerTintColor: "rgb(236, 237, 238)",
    inputBackground: "rgb(26, 26, 26)",
    inputPlaceholder: "rgb(136, 136, 136)",
    inputText: "rgb(236, 237, 238)",
    shadow: "rgb(255, 255, 255)",
    expenseRow: "rgb(132, 32, 41)",
    incomeRow: "rgb(15, 81, 50)",
    primary: "rgb(204, 157, 26)",
    secondary: "rgb(149, 170, 26)",
  },
};

export const ColorGradients: Record<
  "light" | "dark",
  Record<string, [string, string, ...string[]]>
> = {
  light: {
    headerBackground: ["rgb(247, 181, 49)", "rgb(247, 148, 49)"],
  },
  dark: {
    headerBackground: ["rgb(193, 115, 136)", "rgb(144, 48, 111)"],
  },
};