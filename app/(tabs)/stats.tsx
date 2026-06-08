import { View, Text } from "react-native";
import { useEffect } from "react";

import { useAppSelector } from "@/src/store/hooks";
import { ui } from "@/src/styles/uiStyles";

export default function StatsScreen() {
  const expenses = useAppSelector((state) => state.expenses.items)

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <View style={ui.screen}>
      <View style={ui.container}>
        <Text style={ui.title}>Statistics</Text>
        <Text style={ui.subtitle}>Total spent: ${total.toFixed(2)}</Text>
        <Text style={ui.subtitle}>Number of expenses: {expenses.length}</Text>
      </View>
    </View>
  );
}