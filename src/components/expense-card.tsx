import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Expense } from "../features/expenses/expenseTypes";
import { AppTheme, Spacing } from "@/constants/theme";
import { ui } from "../styles/uiStyles";

interface Props {
    expense: Expense,
    onDelete: (id: string) => void;
    onPress?: () => void;
}

export default function ExpenseCard({ expense, onDelete, onPress }: Props) {
    return (  //change $?
        <View style={ui.card}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.title}>{expense.title}</Text> 

                <Text style={ui.subtitle}>${expense.amount}</Text> 

                <Text style={ui.subtitle}>{expense.category}</Text>

                <TouchableOpacity style={ui.buttonPrimary} onPress={() => onDelete(expense.id)}>
                    <Text style={ui.buttonText}>Delete</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppTheme.dark.card,
    padding: Spacing.md,
    borderRadius: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: AppTheme.dark.border,
  },

  title: {
    color: AppTheme.dark.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12
  },

  amount: {
    color: AppTheme.dark.primary,
    fontSize: 15,
    marginTop: 4,
    fontWeight: "600",
  },

  category: {
    color: AppTheme.dark.textMuted,
    marginTop: 4,
    fontSize: 13,
  },
});