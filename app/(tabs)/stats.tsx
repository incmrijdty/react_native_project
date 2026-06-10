import { View, Text, ScrollView, Dimensions } from "react-native";
import { PieChart, LineChart } from "react-native-chart-kit";

import { useAppSelector } from "@/src/store/hooks";
import { ui } from "@/src/styles/uiStyles";
import { AppTheme } from "@/constants/theme";

export default function StatsScreen() {
  const expenses = useAppSelector((state) => state.expenses.items)

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const screenWidth = Dimensions.get("window"). width;

  const chartWidth = Math.min(screenWidth - 40, 420);

  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;

      return acc;
    }, {} as Record<string, number>

  );

  const colors = [
    "#1f57b1",
    "#60A5FA",
    "#4665a9",
    "#113154",
    "#0e1f4d",
    "#3889ac",
  ];

  const monthlyTotals = expenses.reduce(
    (acc, expense) => {
      const month = new Date(
        expense.date
      ).toLocaleDateString(
        "en-US",
        {
          month: "short",
          year: "2-digit",
        }
      );

      acc[month] =
        (acc[month] || 0) +
        expense.amount;

      return acc;
    },
    {} as Record<string, number>
  );


  const pieData = Object.entries(categoryTotals).map(
    ([category, amount], index) => ({
      name: category,
      amount,
      color:  colors[index % 6],
      legendFontColor: '#E6EDF7',
      legendFontSize: 12
    })
  );

  const lineData = {
    labels: Object.keys(monthlyTotals),

    datasets: [
      {
        data: Object.values(monthlyTotals),
      },
    ],
  };

  const largestExpense =
    expenses.length > 0
      ? expenses.reduce((max, expense) =>
        expense.amount > max.amount
          ? expense
          : max
      )
      : null;

  const averageExpense =
    expenses.length > 0
      ? total / expenses.length
      : 0;

  const chartConfig = {
    backgroundGradientFrom: "#151C18",
    backgroundGradientTo: "#151C18",

    decimalPlaces: 0,

    color: (opacity = 1) =>
      `rgba(59,130,246,${opacity})`,

    labelColor: (opacity = 1) =>
      `rgba(230,237,247,${opacity})`,

    propsForDots: {
      r: "5",
    },
  };

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
          Total spent: {total.toFixed(2)}zl
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
            ({largestExpense.amount}zl)
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