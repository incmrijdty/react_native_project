import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { useAppDispatch } from "@/src/store/hooks";
import { addExpense } from "@/src/features/expenses/expenseSlice";
import { useAuth } from "@/src/context/AuthContext";
import { createExpenseForCurrentUser } from "@/src/services/expenseService";
import { uploadReceipt } from "@/src/services/storageApi";
import { pickImageFromGallery } from "@/src/services/imageService";
import { ui } from "@/src/styles/uiStyles";
import { AppTheme } from "@/constants/theme";
import { validateExpense } from "@/src/utils/validation";
import ReceiptPreview from "@/src/components/ReceiptPreview";
import ExpenseForm from "@/src/components/ExpenseForm";


export default function AddExpense() {
    const dispatch = useAppDispatch();
    const params = useLocalSearchParams<{image?: string}>();
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState("PLN");

    const { user } = useAuth();

    const handlePickImage = async () => {
        try {
            const uri = await pickImageFromGallery();

            if (uri) {
                setImage(uri);
            }
        } catch {
            Alert.alert("Permission required");
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

            const validationError =
                validateExpense(
                    title,
                    amount
                );

            if (validationError) {

                Alert.alert(
                    "Invalid expense",
                    validationError
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

            const newExpense = {
                id: Date.now().toString(),
                title,
                amount: parseFloat(amount),
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
        } catch {
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
                <ExpenseForm 
                    title={title}
                    setTitle={setTitle}
                    amount={amount}
                    setAmount={setAmount}
                    category={category}
                    setCategory={setCategory}
                    currency={currency}
                    setCurrency={setCurrency}
                    image={image}
                    setImage={setImage}
                />

                <ReceiptPreview
                    image={image}
                    onRemove={() => setImage(null)}
                    onPickImage={handlePickImage}
                    returnTo="/add"
                />

                <TouchableOpacity
                    style={ui.buttonPrimary}
                    onPress={handleSave}
                    disabled={loading}>
                    {loading ? (
                        <>
                            <ActivityIndicator color={AppTheme.dark.text} />
                            <Text style={ui.buttonText}>Creating...</Text>
                        </>
                    ) : (
                        <Text style={ui.buttonText}>Add an expense</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
