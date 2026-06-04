import { View, Text } from "react-native";
import { useEffect } from "react";

import { useAppSelector } from "@/src/store/hooks";

export default function StatsScreen() {
  const expenses = useAppSelector((state) => state.expenses.items)

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Statistics</Text>
      <Text>Total spent: ${total.toFixed(2)}</Text>
      <Text>Number of expenses: {expenses.length}</Text>
    </View>
  );
}