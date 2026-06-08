import { View, Text } from "react-native";
import { router } from "expo-router";

import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import ExpenseList from "@/src/components/expense-list";
import { deleteExpense } from "@/src/features/expenses/expenseSlice";
import { deleteExpenseForCurrentUser } from "@/src/services/expenseService";
import { useAuth } from "@/src/context/AuthContext";


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
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold'}}>Total: ${total.toFixed(2)}</Text>

      <Text style={{ marginTop: 16, fontSize: 18}}>Recent Expenses</Text>

      <ExpenseList 
      expenses={expenses.slice(-3).reverse()}  
      onDelete={handleDelete}
      onPress={handlePress}
      />
    </View>
  );
}