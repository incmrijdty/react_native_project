import { Expense } from "../features/expenses/expenseTypes";
import { createExpense } from "./expenseApi";

export async function syncGuestExpensesToCloud(expenses: Expense[], userId: string) {
    for (const expense of expenses) {
        await createExpense(expense, userId);
    }
}