import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { deleteExpense } from "@/src/features/expenses/expenseSlice";
import ExpenseList from "@/src/components/expense-list";

export default function ExpensesScreen() {
  const dispatch = useAppDispatch();

  const expenses = useAppSelector(
    (state) => state.expenses.items
  );

  function handleDelete(id: string) {
    dispatch(deleteExpense(id));
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ExpenseList expense={expenses} onDelete={handleDelete} />
    </View>
  );
}