import { AppTheme } from "./theme";

export const chartConfig = {
    backgroundGradientFrom: AppTheme.dark.chartBackground,
    backgroundGradientTo: AppTheme.dark.chartBackground,

    decimalPlaces: 0,

    color: (opacity = 1) =>
        `rgba(59,130,246,${opacity})`,

    labelColor: (opacity = 1) =>
        `rgba(230,237,247,${opacity})`,

    propsForDots: {
        r: "5",
    },
};