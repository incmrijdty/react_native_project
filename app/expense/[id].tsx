import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/src/store/hooks";

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
        <View style={styles.container}>
            <Text style={styles.title}>{expense.title}</Text>

            <Text style={styles.amount}>{expense.currency}{expense.amount}</Text>

            <Text style={styles.label}>{expense.category}</Text>

            <Text style={styles.label}>
                {new Date(expense.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </Text>

            {expense.image && (
                <Image
                    source={{ uri: expense.image }}
                    style={styles.image}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    amount: {
        fontSize: 24,
        marginBottom: 12
    },
    label: {
        fontSize: 18,
        marginBottom: 8
    },
    image: {
        width: '100%',
        height: 250,
        marginTop: 20,
        borderRadius: 12
    }
})

