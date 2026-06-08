import { View } from "react-native";
import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { deleteExpense } from "@/src/features/expenses/expenseSlice";
import ExpenseList from "@/src/components/expense-list";
import { useAuth } from "@/src/context/AuthContext";
import { deleteExpenseForCurrentUser } from "@/src/services/expenseService";

export default function ExpensesScreen() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const expenses = useAppSelector(
    (state) => state.expenses.items
  );

  async function handleDelete(id: string, imageUrl?: string) {
    await deleteExpenseForCurrentUser(id, user?.id, imageUrl);
        
    dispatch(deleteExpense(id));
  }

  function handlePress(id: string) {
    router.push(`../expense/${id}`);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ExpenseList 
        expenses={expenses} 
        onDelete={handleDelete}
        onPress={handlePress}
      />
    </View>
  );
}