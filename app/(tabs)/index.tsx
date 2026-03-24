import { View, Text, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { addExpense } from "@/src/features/expenses/expenseSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector((state) => state.expenses.items);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Total expenses: {expenses.length}</Text>

      <Button
      title ="Add test expense"
      onPress={() => 
        dispatch(
          addExpense({
            id: Date.now().toString(),
            title: "Coffee",
            amount: 5,
            category: "Food",
            date: new Date().toISOString(),
            currency: "USD",
          })
        )

      }>
        
      </Button>
    </View>
  );
}