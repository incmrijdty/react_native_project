import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "../features/expenses/expenseTypes";

const EXPENSES_KEY = "expenses";

export const saveExpenses = async (expenses: Expense[]) => {
    try {
        const json = JSON.stringify(expenses);
        await AsyncStorage.setItem(EXPENSES_KEY, json);
    } catch (error) {
        console.log("Error saving expenses", error);
    }
};

export const loadExpenses = async (): Promise<Expense[]> => {
    try {
        const json = await AsyncStorage.getItem(EXPENSES_KEY);

        if (json !== null) {
            return JSON.parse(json);
        }

        return [];
    } catch (error) {
        console.log("Error loading expenses", error);
        return [];
    }
};