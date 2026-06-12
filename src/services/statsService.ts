import { StatColors } from "@/constants/statsColors";
import { AppTheme } from "@/constants/theme";
import { Expense } from "../features/expenses/expenseTypes";

export function calculateStats(expenses: Expense[]) {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const largestExpense =
        expenses.length > 0
            ? expenses.reduce((max, expense) =>
                expense.amount > max.amount
                    ? expense
                    : max
            )
            : null;

    const averageExpense =
        expenses.length > 0
            ? total / expenses.length
            : 0;

    return {
        total,
        averageExpense,
        largestExpense,
    };
}

export function buildPieData(expenses: Expense[]) {

   const categoryTotals = expenses.reduce(
        (acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;

            return acc;
        }, {} as Record<string, number>

    );

    return Object.entries(categoryTotals).map(
        ([category, amount], index) => ({
            name: category,
            amount,
            color: StatColors[index % StatColors.length],
            legendFontColor: AppTheme.dark.text,
            legendFontSize: 12
        })
    );

}

export function buildLineData(expenses: Expense[]) {
    const monthlyTotals = expenses.reduce(
        (acc, expense) => {
            const month = new Date(
                expense.date
            ).toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    year: "2-digit",
                }
            );

            acc[month] =
                (acc[month] || 0) +
                expense.amount;

            return acc;
        },
        {} as Record<string, number>
    );

    const lineData = {
        labels: Object.keys(monthlyTotals),

        datasets: [
            {
                data: Object.values(monthlyTotals),
            },
        ],
    };

    return lineData;

}