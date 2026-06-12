import { View, Text, ScrollView, Dimensions } from "react-native";
import { PieChart, LineChart } from "react-native-chart-kit";

import { useAppSelector } from "@/src/store/hooks";
import { ui } from "@/src/styles/uiStyles";
import { AppTheme } from "@/constants/theme";
import { chartConfig } from "@/constants/chartConfig";
import { calculateStats, buildLineData, buildPieData } from "@/src/services/statsService";

export default function StatsScreen() {
  const expenses = useAppSelector((state) => state.expenses.items)

  const { total, averageExpense, largestExpense } = calculateStats(expenses);

  const screenWidth = Dimensions.get("window"). width;

  const chartWidth = Math.min(screenWidth - 40, 420);

  const pieData =
    buildPieData(expenses);

  const lineData =
    buildLineData(expenses);

  if (expenses.length === 0) {
    return (
      <View style={ui.screen}>
        <View style={ui.container}>
          <Text style={ui.title}>
            Statistics
          </Text>

          <Text style={ui.subtitle}>
            No data available yet.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: AppTheme.dark.background,
      }}
      contentContainerStyle={ui.scrollContent}
    >
      <View style={ui.container}>
        <Text style={ui.title}>
          Statistics
        </Text>

        <Text style={ui.subtitle}>
          Total spent: {total.toFixed(2)} zl
        </Text>

        <Text style={ui.subtitle}>
          Expenses: {expenses.length}
        </Text>

        <Text style={ui.subtitle}>
          Average expense:
          {averageExpense.toFixed(2)} zl
        </Text>

        {largestExpense && (
          <Text style={ui.subtitle}>
            Largest expense:
            {" "}
            {largestExpense.title}
            {" "}
            ({largestExpense.amount} zl)
          </Text>
        )}

        <Text
          style={[
            ui.title,
            {
              fontSize: 22,
              marginTop: 30,
            },
          ]}
        >
          Spending by Category
        </Text>

        {pieData.length > 0 && (
          <PieChart
            data={pieData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        )}

        <Text
          style={[
            ui.title,
            {
              fontSize: 22,
              marginTop: 30,
            },
          ]}
        >
          Monthly Spending
        </Text>

        {lineData.labels.length > 0 && (
          <LineChart
            data={lineData}
            width={screenWidth - 40}
            height={250}
            chartConfig={chartConfig}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        )}
      </View>
    </ScrollView>
);
}