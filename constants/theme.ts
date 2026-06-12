/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const AppTheme = {
  dark: {
    background: "#0F172A",     
    card: "#172033",
    cardAlt: "#1E293B",

    text: "#E6EDF7",
    textMuted: "#94A3B8",

    primary: "#2375CB",
    primarySoft: "rgba(35, 117, 203, 0.15)",

    border: "#2B3A55",
    danger: "#EF4444",

    chartBackground: "#15151c",
  }
};

export const Spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};
