import { View, Text, Button } from "react-native";
import { useAppDispatch } from "@/src/store/hooks";
import { addExpense } from "@/src/features/expenses/expenseSlice";

export default function AddExpense() {
    const dispatch = useAppDispatch();

    function createExpense() {
        dispatch(
            addExpense({
                id: Date.now().toString(),
                title: "Coffee",
                amount: 5,
                category: "Food",
                date: new Date().toISOString(),
                currency: "USD",
            })
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Add Test Expense" onPress={createExpense} />
        </View>
    );
}