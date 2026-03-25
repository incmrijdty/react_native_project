import { View, Text, Button, StyleSheet } from "react-native";
import { Expense } from "../features/expenses/expenseTypes";

interface Props {
    expense: Expense,
    onDelete: (id: string) => void;
}

export default function ExpenseCard({ expense, onDelete }: Props) {
    return (  //change $?
        <View style={styles.card}>
            <Text style={styles.title}>{expense.title}</Text> 

            <Text>${expense.amount}</Text> 

            <Text>{expense.category}</Text>

            <Button title="Delete" onPress={() => onDelete(expense.id)} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 12,
        marginVertical: 6,
        backgroundColor: "#eee",
        borderRadius: 8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
    },
});