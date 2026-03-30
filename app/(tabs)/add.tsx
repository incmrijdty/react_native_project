import { View, Text, Button, TextInput } from "react-native";
import { useAppDispatch } from "@/src/store/hooks";
import { addExpense } from "@/src/features/expenses/expenseSlice";
import { useState } from "react";
import { router } from "expo-router";

export default function AddExpense() {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState("");

    const handleSave = () => {
        if (!title || !amount) return;
        
        dispatch(
            addExpense({
                id: Date.now().toString(),
                title,
                amount: parseFloat(amount),
                category: category || "general",
                date: new Date().toISOString(),
                currency: "USD",
            })
        );

        setTitle("");
        setAmount("");
        setCategory("");

        router.back();
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
                style={{ borderWidth: 1, marginBottom: 12 }}
            />

            <Text>Amount</Text>
            <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Enter amount"
                style={{ borderWidth: 1, marginBottom: 12 }}
            />

            <Text>Category</Text>
            <TextInput 
                value={category}
                onChangeText={setCategory}
                placeholder="Enter category"
                style={{ borderWidth: 1, marginBottom: 12 }}
            />


            <Button title="Add Expense" onPress={handleSave} />
        </View>
    );
}
