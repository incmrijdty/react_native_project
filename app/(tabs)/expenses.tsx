import { Alert, View, Text, ScrollView } from "react-native";
import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { deleteExpense } from "@/src/features/expenses/expenseSlice";
import ExpenseList from "@/src/components/expense-list";
import { useAuth } from "@/src/context/AuthContext";
import { deleteExpenseForCurrentUser } from "@/src/services/expenseService";
import { ui } from "@/src/styles/uiStyles";

export default function ExpensesScreen() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const expenses = useAppSelector(
    (state) => state.expenses.items
  );

  async function handleDelete(id: string, imageUrl?: string) {
    try {
      await deleteExpenseForCurrentUser(id, user?.id, imageUrl);

      dispatch(deleteExpense(id));
    } catch {
        Alert.alert("Error", "Could not delete expense")
    }
  }

  function handlePress(id: string) {
    router.push(`../expense/${id}`);
  }

  return (
    <View style={ui.screen}>
      <View style={ui.container}>
        <Text style={ui.title}>Your Expenses</Text>
        <ExpenseList
          expenses={expenses}
          onDelete={handleDelete}
          onPress={handlePress}
        />
      </View>
    </View>
  );
}