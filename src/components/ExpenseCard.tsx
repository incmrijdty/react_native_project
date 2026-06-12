import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Expense } from "../features/expenses/expenseTypes";
import { AppTheme } from "@/constants/theme";
import { ui } from "../styles/uiStyles";


interface Props {
    expense: Expense,
    onDelete: (id: string) => void;
    onPress?: () => void;
}

export default memo(function ExpenseCard({ expense, onDelete, onPress }: Props) {
    return (
        <View style={ui.card}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.title}>{expense.title}</Text> 

                <Text style={ui.subtitle}> {expense.currency} {expense.amount}</Text> 

                <Text style={ui.subtitle}>{expense.category}</Text>

                <TouchableOpacity style={ui.buttonPrimary} onPress={() => onDelete(expense.id)}>
                    <Text style={ui.buttonText}>Delete</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
  title: {
    color: AppTheme.dark.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12
  },
});