import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import ExpenseList from "@/src/components/expense-list";
import { deleteExpense, setExpenses } from "@/src/features/expenses/expenseSlice";
import { loadExpenses, saveExpenses } from "@/src/services/storage";


export default function Dashboard() {
  const expenses = useAppSelector(
    (state) => state.expenses.items
  );
  const dispatch = useAppDispatch();
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { // think of the way to make it into another file so that this screena nd dashboard wouldnt repeat each other
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

  function handleDelete(id: string) {
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
      expenses={expenses.slice(-3).reverse()}  //change to sorting by data later
      onDelete={handleDelete}
      onPress={handlePress}
      />

      <Button
        title="Login"
        onPress={() => router.push("/(auth)/login")}
      />

      <Button
        title="Register"
        onPress={() => router.push("/(auth)/register")}
      />
    </View>
  );
}