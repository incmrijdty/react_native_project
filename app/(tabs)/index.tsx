import { View, Text } from "react-native";
import { router } from "expo-router";

import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import ExpenseList from "@/src/components/expense-list";
import { deleteExpense } from "@/src/features/expenses/expenseSlice";
import { deleteExpenseForCurrentUser } from "@/src/services/expenseService";
import { useAuth } from "@/src/context/AuthContext";
import { ui } from "@/src/styles/uiStyles";


export default function Dashboard() {
  const expenses = useAppSelector(
    (state) => state.expenses.items
  );
  const dispatch = useAppDispatch();
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const { user } = useAuth();

  async function handleDelete(id: string, imageUrl?: string) {
    await deleteExpenseForCurrentUser(id, user?.id, imageUrl);
    
    dispatch(deleteExpense(id));
  }

  function handlePress(id: string) {
    router.push(`../expense/${id}`);
  };

  if (expenses.length === 0) {
    return (
      <View style={ui.screen}>
        <View style={ui.container}>
          <Text style={ui.title}>
            Your Expense Tracker
          </Text>

          <Text style={ui.subtitle}>
            Add some expenses to see your
            spending insights.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={ui.screen}>
      <View style={ui.container}>
        <Text style={ui.title}>Your Expense Tracker</Text>

        <Text style={ui.subtitle}>Total: ${total.toFixed(2)}</Text>

        <Text style={ui.subtitle}>Recent Expenses</Text>

        <ExpenseList
          expenses={expenses.slice(-3).reverse()}
          onDelete={handleDelete}
          onPress={handlePress}
        />
      </View>
    </View>
  );
}