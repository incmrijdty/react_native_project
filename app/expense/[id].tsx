import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useAppSelector } from "@/src/store/hooks";
import { AppTheme, Spacing } from "@/constants/theme";
import { ui } from "@/src/styles/uiStyles";

export default function ExpenseDetailsScreen() {
    const { id } = useLocalSearchParams();

    const expense = useAppSelector((state) =>
        state.expenses.items.find((item) => item.id === id)
    );

    if (!expense) {
        return (
            <View style={styles.container}>
                <Text>Expense not found.</Text>
            </View>
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.dark.background,
    padding: Spacing.lg,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: AppTheme.dark.text,
  },

  amount: {
    fontSize: 22,
    color: AppTheme.dark.primary,
    marginVertical: 12,
    fontWeight: "700",
  },

  label: {
    fontSize: 14,
    color: AppTheme.dark.textMuted,
    marginBottom: 6,
  },

  image: {
    width: "100%",
    height: 350,
    borderRadius: 16,
    marginTop: 20,
  },
});