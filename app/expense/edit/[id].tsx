import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { updateExpenseForCurrentUser } from "@/src/services/expenseService";
import { updateExpense } from "@/src/features/expenses/expenseSlice";

export default function EditExpenseScreen() {
    const { id } = useLocalSearchParams();
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    const expense = useAppSelector(state => 
        state.expenses.items.find(
            (item) => item.id === id
        )
    );

    const [title, setTitle] = useState(expense?.title ?? '');
    const [amount, setAmount] = useState(expense?.amount.toString() ?? '');
    const [category, setCategory] = useState(expense?.category ?? '');

    async function handleSave() {
        if (!title || !amount) {
            Alert.alert(
                "Validation",
                "Title and amount are required."
            );
            return;
        }

        if (!expense) {
            return (
                <View style={{ padding: 20 }}>
                    <Text>Expense not found.</Text>
                </View>
            )
        }

        const updatedExpense = {
            ...expense,
            title,
            amount: Number(amount),
            category
        };

        try {
            await updateExpenseForCurrentUser(
                updatedExpense,
                user?.id,
            );

            dispatch(
                updateExpense(updatedExpense)
            );

            router.back();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View
            style={{
                flex: 1,
                padding: 16,
                gap: 12,
            }}
        >
            <Text>Title</Text>

            <TextInput
                value={title}
                onChangeText={setTitle}
                style={{
                    borderWidth: 1,
                    padding: 10,
                }}
            />

            <Text>Amount</Text>

            <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    padding: 10,
                }}
            />

            <Text>Category</Text>

            <TextInput
                value={category}
                onChangeText={setCategory}
                style={{
                    borderWidth: 1,
                    padding: 10,
                }}
            />

            <Button
                title="Save Changes"
                onPress={handleSave}
            />
        </View>
    )
}