import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useLocalSearchParams, router } from "expo-router";
import { useState }from "react";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";

import { View, Text, TextInput, Alert, Image, TouchableOpacity } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { uploadReceipt, deleteReceipt } from "@/src/services/storageApi";
import { updateExpenseForCurrentUser } from "@/src/services/expenseService";
import { updateExpense } from "@/src/features/expenses/expenseSlice";
import { ui } from "@/src/styles/uiStyles";
import { currencies } from "@/constants/currencies";

export default function EditExpenseScreen() {
    const { id } = useLocalSearchParams();
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const expense = useAppSelector(state => 
        state.expenses.items.find(
            (item) => item.id === id
        )
    );

    const [title, setTitle] = useState(expense?.title ?? '');
    const [amount, setAmount] = useState(expense?.amount.toString() ?? '');
    const [currency, setCurrency] = useState("PLN");
    const [category, setCategory] = useState(expense?.category ?? '');
    const [image, setImage] = useState(expense?.imageUrl ?? null)

    const pickImage = async () => {
        const result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 0.7,
                allowsEditing: true,
            });

        if (!result.canceled) {
            setImage(
                result.assets[0].uri
            );
        }
    }

    async function handleSave() {   
        try {  
            setLoading(true);

            if (!title || !amount) {
                Alert.alert(
                    "Validation",
                    "Title and amount are required."
                );
                return;
            }

            if (!expense) {
                Alert.alert("Error", "Expense not found.");
                return;
            }

            let uploadedImageUrl = image;

            if (
                image &&
                user &&
                image.startsWith("file://")
            ) {
                const result =
                    await uploadReceipt(
                        image,
                        user.id
                    );

                if (result.data) {
                    uploadedImageUrl =
                        result.data;
                }
            }

            if (
                expense.imageUrl &&
                expense.imageUrl !== uploadedImageUrl &&
                expense.imageUrl.startsWith("http")
            ) {
                await deleteReceipt(
                    expense.imageUrl
                );
            }

            const updatedExpense = {
                ...expense,
                title,
                amount: Number(amount),
                currency,
                category,
                imageUrl: uploadedImageUrl ?? undefined
            };

            await updateExpenseForCurrentUser(
                updatedExpense,
                user?.id,
            );

            dispatch(
                updateExpense(updatedExpense)
            );

            router.back();
        }  catch (error) {
            console.log("SAVE  ERROR:", error);
            Alert.alert("Error", "Could not update expense");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={ui.screen}>
            <View style={ui.container}>
                <Text style={ui.subtitle}>Title</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholderTextColor="#777"
                    style={ui.input}
                />

                <Text style={ui.subtitle}>Amount</Text>
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
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
                    placeholderTextColor="#777"
                    style={ui.input}
                />

                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: "100%",
                            height: 200,
                        }}
                    />
                )}

                <TouchableOpacity style={ui.buttonPrimary} onPress={pickImage}>
                    <Text style={ui.buttonText}>Change receipt</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ui.buttonPrimary} onPress={handleSave}>
                    <Text style={ui.buttonText}>Save changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}