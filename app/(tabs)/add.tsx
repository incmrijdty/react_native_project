import { View, Text, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import { useAppDispatch } from "@/src/store/hooks";
import { addExpense } from "@/src/features/expenses/expenseSlice";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "@/src/context/AuthContext";
import { createExpenseForCurrentUser } from "@/src/services/expenseService";
import { uploadReceipt } from "@/src/services/storageApi";
import { ui } from "@/src/styles/uiStyles";

export default function AddExpense() {
    const dispatch = useAppDispatch();
    const params = useLocalSearchParams<{image?: string}>();
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

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
        try {
            setLoading(true);

            if (!title || !amount) return;

            let uploadedImageUrl = image;

            if (image && user) {
                const result =
                    await uploadReceipt(
                        image,
                        user.id
                    );

                console.log("UPLOAD RESULT");
                console.log(result);

                if (result.data) {
                    uploadedImageUrl = result.data;
                }
            }

            const newExpense = {
                id: Date.now().toString(),
                title,
                amount: parseFloat(amount),
                category: category || "general",
                date: new Date().toISOString(),
                currency: "USD",
                imageUrl: uploadedImageUrl || undefined,
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
        } catch (error) {
            Alert.alert("Error", "Could not save expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={ui.screen}>
            <View style={ui.container}>
                <Text style={ui.title}>Add an expense</Text>
                <Text style={ui.subtitle}>Title</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                    placeholderTextColor="#777"
                    style={ui.input}
                />

                <Text>Amount</Text>
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="Enter amount"
                    placeholderTextColor="#777"
                    style={ui.input}
                />

                <Text>Category</Text>
                <TextInput
                    value={category}
                    onChangeText={setCategory}
                    placeholder="Enter category"
                    placeholderTextColor="#777"
                    style={ui.input}
                />

                {image && (
                    <Image source={{ uri: image }} style={{ height: 250 }} />
                )}
                <View style={{ gap: 10, padding: 10 }}>
                    <TouchableOpacity style={ui.buttonPrimary} onPress={() => router.push("/camera")}>
                        <Text style={ui.buttonText}>Add a receipt</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={ui.buttonPrimary} onPress={pickImage}>
                        <Text style={ui.buttonText}>Pick from Galery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ui.buttonPrimary}
                        onPress={handleSave}
                        disabled={loading}>
                        <Text style={ui.buttonText}>Add an expense</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
