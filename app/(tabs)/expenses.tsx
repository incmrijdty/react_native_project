import { View } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { deleteExpense, setExpenses } from "@/src/features/expenses/expenseSlice";
import ExpenseList from "@/src/components/expense-list";
import { saveExpenses, loadExpenses } from "@/src/services/storage";

export default function ExpensesScreen() {
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);

  const expenses = useAppSelector(
    (state) => state.expenses.items
  );

  function handleDelete(id: string) {
    dispatch(deleteExpense(id));
  }

  function handlePress(id: string) {
    router.push(`../expense/${id}`);
  }

  useEffect(() => {
    if (!loaded) return;
    
    saveExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const storedExpenses = await loadExpenses();
      dispatch(setExpenses(storedExpenses));
      setLoaded(true);
    };
    fetchExpenses();
  }, []);

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