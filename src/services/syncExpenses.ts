import { Expense } from "../features/expenses/expenseTypes";
import { createExpense } from "./expenseApi";
import { uploadReceipt } from "./receiptApi";

export async function syncGuestExpensesToCloud(expenses: Expense[], userId: string) {
    for (const expense of expenses) {
        let imageUrl = expense.imageUrl;
        
        if (
            imageUrl && imageUrl.startsWith("file://")
        ) {
            const uploadResult = await uploadReceipt(imageUrl, userId);

            if (uploadResult.data) {
                imageUrl = uploadResult.data;
            }
        }
        await createExpense(
            {
                ...expense,
                imageUrl
            },
            userId
        );
    }
}