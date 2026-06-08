import { supabase } from "../lib/supabase";
import { Expense } from "../features/expenses/expenseTypes";

export async function fetchExpenses(userId: string) {
    const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false }); 

        const mappedData =
        data?.map((expense) => ({
            ...expense,
            imageUrl: expense.image_url,
        })) ?? [];

    return { data: mappedData, error };
}

export async function createExpense(
    expense: Expense,
    userId: string,
) {
    const { data, error } = await supabase
        .from("expenses")
        .insert({
            title: expense.title,
            amount: expense.amount,
            currency: expense.currency,
            category: expense.category,
            date: expense.date,
            image_url: expense.imageUrl,
            user_id: userId,
        })
        .select()
        .single();

    return { data, error };
}

export async function deleteExpenseCloud(expenseId: string) {

    const { error } =  await supabase
        .from("expenses")
        .delete()
        .eq("id", expenseId);

    return  { error };
}

export async function updateExpenseCloud( 
    expense: Expense,
) {
    const { data, error } = await supabase
        .from("expenses")
        .update({
            title: expense.title,
            amount: expense.amount,
            currency: expense.currency,
            category: expense.category,
            date: expense.date,
            image_url: expense.imageUrl,
        })
        .eq("id", expense.id)
        .select()
        .single();

    return { data, error };
}