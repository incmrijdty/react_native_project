import { View, Text, TouchableOpacity, TextInput, Image, Alert, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";

import { useAppDispatch } from "@/src/store/hooks";
import { addExpense } from "@/src/features/expenses/expenseSlice";
import { useAuth } from "@/src/context/AuthContext";
import { createExpenseForCurrentUser } from "@/src/services/expenseService";
import { uploadReceipt } from "@/src/services/storageApi";
import { ui } from "@/src/styles/uiStyles";
import { currencies } from "@/constants/currencies";
import { AppTheme } from "@/constants/theme";

export default function AddExpense() {
    const dispatch = useAppDispatch();
    const params = useLocalSearchParams<{image?: string}>();
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState("PLN");

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

            if (!title.trim() || !amount.trim()) 
                {
                    Alert.alert(
                        "Required fields",
                        'Please enter both a title and an amount.'
                    );

                    return;
                }

            let uploadedImageUrl = image;

            if (image && user) {
                const result =
                    await uploadReceipt(
                        image,
                        user.id
                    );

                if (result.data) {
                    uploadedImageUrl = result.data;
                }
            }

            const parsedAmount = parseFloat(amount);

            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                Alert.alert(
                    "Invalid amount",
                    "Please enter a valid number greater than 0."
                );

                return;
            }

            const newExpense = {
                id: Date.now().toString(),
                title,
                amount: parsedAmount,
                category: category || "general",
                date: new Date().toISOString(),
                currency,
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
        <ScrollView 
            style={{
                    flex: 1,
                    backgroundColor: AppTheme.dark.background,
                  }}
            contentContainerStyle={ui.scrollContent}
        >
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

                <Text style={ui.subtitle}>Amount</Text>
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="Enter amount"
                    placeholderTextColor="#777"
                    style={ui.input}
                />

                <Text style={ui.subtitle}>Currency</Text>
                <Picker 
                    selectedValue={currency}
                    onValueChange={setCurrency}
                >
                    {currencies.map((item) => (
                        <Picker.Item
                            key={item}
                            label={item}
                            value={item}
                        />
                    ))}
                </Picker>

                <Text style={ui.subtitle}>Category</Text>
                <TextInput
                    value={category}
                    onChangeText={setCategory}
                    placeholder="Enter category"
                    placeholderTextColor="#777"
                    style={ui.input}
                />

                {image && (
                    <>
                        <Image source={{ uri: image }} style={ui.photo} />
                        <TouchableOpacity
                            style={[
                                ui.buttonPrimary,
                                {
                                    padding: 10,
                                }
                            ]}
                            onPress={() => {
                                Alert.alert(
                                    "Receipt photo",
                                    "What would you like to do?",
                                    [
                                        {
                                            text: "Keep",
                                            style: "cancel"
                                        },
                                        {
                                            text: "Retake",
                                            onPress: () => router.push("/camera")
                                        },
                                        {
                                            text: "Cancel photo",
                                            style: "destructive",
                                            onPress: () => setImage(null),
                                        },
                                    ]
                                );
                            }}
                        >

                            <Text style={ui.buttonText}>Manage photo</Text>
                        </TouchableOpacity>
                    </>
                )}

                {!image && (
                    <TouchableOpacity style={ui.buttonPrimary} onPress={() => {
                        Alert.alert(
                            "Adding a receipt photo",
                            "How would you like to add a photo?",
                            [
                                {
                                    text: "Open Camera",
                                    onPress: () => router.push("/camera")
                                },
                                {
                                    text: "Pick from Galery",
                                    onPress: pickImage
                                }
                            ]
                        )
                    }}>
                        <Text style={ui.buttonText}>Add a receipt</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={ui.buttonPrimary}
                    onPress={handleSave}
                    disabled={loading}>
                    <Text style={ui.buttonText}>Add an expense</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
