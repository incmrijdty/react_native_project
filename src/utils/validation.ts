export function validateExpense(
    title: string,
    amount: string
): string | null {
    
    if (!title.trim()) {
        return "Please enter a title.";
    }

    if (!amount.trim()) {
        return "Please enter an amount.";
    }

    const parsed = parseFloat(amount);

    if (isNaN(parsed) || parsed <= 0) {
        return "Amount must be greater than 0.";
    }

    return null;
}