import { FlatList } from "react-native";
import { Expense } from "../features/expenses/expenseTypes";
import ExpenseCard from "./expense-card";

interface Props {
    expense: Expense[];
    onDelete: (id: string) => void;
}

export default function ExpenseList({ expense, onDelete}: Props) {
    return (
        <FlatList
            data={expense}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ExpenseCard expense={item} onDelete={onDelete} />
            )}
        />
    );
}