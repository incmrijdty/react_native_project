import { View, Text, Alert, useWindowDimensions } from "react-native";
import { router } from "expo-router";

import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import ExpenseList from "@/src/components/ExpenseList";
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
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  function handleDelete(id: string, imageUrl?: string) {
    Alert.alert(
      "Delete expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteExpenseForCurrentUser(id, user?.id, imageUrl);

            dispatch(deleteExpense(id));

          },
        },
      ],
    );
    
  }

  function handlePress(id: string) {
    router.push(`../expense/${id}`);
  };

  if (expenses.length === 0) {
    return (
      <View style={ui.screen}>
        <View style={[
          ui.container,
          {
            maxWidth: isTablet ? 600 : 420
          },
        ]}>
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

        <Text style={ui.title}>Your Expense Tracker</Text>

        <Text style={ui.subtitle}>Total: {total.toFixed(2)} zl</Text>

        <Text style={ui.subtitle}>Recent Expenses</Text>

        <ExpenseList
          expenses={expenses.slice(-3)}
          onDelete={handleDelete}
          onPress={handlePress}
        />
    </View>
  );
}