import { Expense } from "../features/expenses/expenseTypes";

import { loadExpenses, saveExpenses } from "./storage";
import { createExpense, deleteExpenseCloud, updateExpenseCloud } from "./expenseApi";

export async function createExpenseForCurrentUser(
    expense: Expense,
    userId?: string
) {
    if (userId) {
        return await createExpense(
            expense,
            userId
        );
    }

    const expenses = await loadExpenses();

    expenses.push(expense);

    await saveExpenses(expenses);

    return {
        data: expense,
        error: null,
    };
}

export async function deleteExpenseForCurrentUser(
    expenseId: string,
    userId?: string
) {
    if (!userId) {
        return
    };

    await deleteExpenseCloud(expenseId);
}

export async function updateExpenseForCurrentUser(
    expense: Expense,
    userId?: string,
) {
    if (userId) {
        return await updateExpenseCloud(expense);
    }

    const expenses = await loadExpenses();

    const updatedExpense = expenses.map((item) => 
        item.id === expense.id ? expense : item
    );

    await saveExpenses(updatedExpense);

    return {
        data: expense,
        error: null,
    };
}