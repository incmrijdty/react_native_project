import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { AppTheme } from "@/constants/theme";
import { ui } from "@/src/styles/uiStyles";
import { deleteExpense } from "@/src/features/expenses/expenseSlice";
import { deleteExpenseForCurrentUser } from "@/src/services/expenseService";
import { useAuth } from "@/src/context/AuthContext";

export default function ExpenseDetailsScreen() {
    const { id } = useLocalSearchParams();
    const dispatch = useAppDispatch();
    const { user } = useAuth();

    const expense = useAppSelector((state) =>
        state.expenses.items.find((item) => item.id === id)
    );

    if (!expense) {
        return (
            <View style={ui.container}>
                <Text>Expense not found.</Text>
            </View>
        );
    }

    function handleDelete(id: string, imageUrl?: string) {
        Alert.alert(
          "Delete expense",
          "Are you sure you want to delete this expense?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                await deleteExpenseForCurrentUser(id, user?.id, imageUrl);
    
                dispatch(deleteExpense(id));

                router.replace("/");
    
              },
            },
          ],
        );
        
      }


    return (
        <View style={ui.screen}>
            <View style={ui.container}>
                <Text style={ui.title}>Expense Details</Text>

                <Text style={styles.title}>{expense.title}</Text>

                <Text style={ui.subtitle}>{expense.currency} {expense.amount}</Text>

                <Text style={ui.subtitle}>{expense.category}</Text>

                <Text style={ui.subtitle}>
                    {new Date(expense.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </Text>

                {expense.imageUrl && (
                    <Image
                        source={{ uri: expense.imageUrl }}
                        style={styles.image}
                    />
                )}

                <TouchableOpacity 
                    style={ui.buttonPrimary} 
                    onPress={() => router.push(`./edit/${expense.id}`)}>
                        <Text style={ui.buttonText}>Edit Expense</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={ui.buttonPrimary} 
                    onPress={() => handleDelete(expense.id, expense.imageUrl)}>
                        <Text style={ui.buttonText}>Delete Expense</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: AppTheme.dark.text,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 16,
    marginTop: 20,
  },
});