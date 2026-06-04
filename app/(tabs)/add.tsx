import { View, Text, Button, TextInput, Image } from "react-native";
import { useAppDispatch } from "@/src/store/hooks";
import { addExpense } from "@/src/features/expenses/expenseSlice";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "@/src/context/AuthContext";
import { createExpenseForCurrentUser } from "@/src/services/expenseService";

export default function AddExpense() {
    const dispatch = useAppDispatch();
    const params = useLocalSearchParams<{image?: string}>();
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState("");

    const { user } = useAuth();

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("Permission to access gallery is required!");
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.7,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    useEffect(() => {
        if (params.image) {
            setImage(params.image);
        }
    }, [params.image])

    const handleSave = async () => {
        if (!title || !amount) return;

        const newExpense = {
            id: Date.now().toString(),
            title,
            amount: parseFloat(amount),
            category: category || "general",
            date: new Date().toISOString(),
            currency: "USD",
            imageUrl: image || undefined,
        };

        const result = await createExpenseForCurrentUser(
            newExpense,
            user?.id
        );

        if (user?.id && result?.data) {
            newExpense.id = result.data.id;
        }

        dispatch(addExpense(newExpense));
        
        setTitle("");
        setAmount("");
        setCategory("");
        setImage(null);

        router.replace("/");
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

            {image && (
                <Image source={{ uri: image }} style= {{ height: 100 }} />
            )}
            <View style={{ gap: 10, padding: 10 }}>
                <Button 
                    title="Add Receipt Photo"
                    onPress={() => router.push("/camera")}
                />

                <Button
                    title="Pick from Gallery"
                    onPress={pickImage}
                />

                <Button title="Add Expense" onPress={handleSave} />
            </View>
        </View>
    );
}
