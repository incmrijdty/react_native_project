import { FlatList } from "react-native";
import { Expense } from "../features/expenses/expenseTypes";
import ExpenseCard from "./ExpenseCard";

interface Props {
    expenses: Expense[];
    onDelete: (id: string) => void;
    onPress: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete, onPress }: Props) {
    return (
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ExpenseCard
                        expense={item}
                        onDelete={onDelete}
                        onPress={() => onPress(item.id)} />
                )}
            />
    );
}