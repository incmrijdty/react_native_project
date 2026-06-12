import { useLocalSearchParams, router } from "expo-router";
import { useState }from "react";
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from "react-native";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useAuth } from "@/src/context/AuthContext";
import { uploadReceipt, deleteReceipt } from "@/src/services/storageApi";
import { updateExpenseForCurrentUser } from "@/src/services/expenseService";
import { updateExpense } from "@/src/features/expenses/expenseSlice";
import { ui } from "@/src/styles/uiStyles";
import { pickImageFromGallery } from "@/src/services/imageService";
import ReceiptPreview from "@/src/components/ReceiptPreview";
import ExpenseForm from "@/src/components/ExpenseForm";
import { validateExpense } from "@/src/utils/validation";
import { AppTheme } from "@/constants/theme";

export default function EditExpenseScreen() {
    const params = useLocalSearchParams();
    const id = typeof params.id === "string"
        ? params.id
        : undefined;
        
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const expense = useAppSelector(state => state.expenses.items.find(
            (item) => item.id === id
        )
    );

    const [title, setTitle] = useState(expense?.title ?? '');
    const [amount, setAmount] = useState(expense?.amount.toString() ?? '');
    const [currency, setCurrency] = useState(expense?.currency ?? 'PLN');
    const [category, setCategory] = useState(expense?.category ?? '');
    const [image, setImage] = useState(expense?.imageUrl ?? null)

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

    async function handleSave() {   
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
        }  catch {
            Alert.alert("Error", "Could not update expense");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={ui.screen}>
            <View style={ui.container}>
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
                    returnTo={"edit"}
                    expenseId={id}
                />

                <TouchableOpacity style={ui.buttonPrimary} onPress={handleSave} disabled={loading}>
                    {loading ? (
                        <>
                            <ActivityIndicator color={AppTheme.dark.text} />
                            <Text style={ui.buttonText}>Saving...</Text>
                        </>
                    ) : (
                        <Text style={ui.buttonText}>Save changes</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}