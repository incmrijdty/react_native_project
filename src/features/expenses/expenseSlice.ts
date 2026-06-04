import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "./expenseTypes";
import { act } from "react";

interface ExpensesState {
  items: Expense[];
}

const initialState: ExpensesState = {
  items: [],
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.items.push(action.payload);
      console.log(state.items);
    },

    deleteExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (expense) => expense.id !== action.payload
      );
    },

    setExpenses: (state, action) => {
      state.items = action.payload;
    },
    
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.items.findIndex(
        expense => expense.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    }
  },
});

export const { addExpense, deleteExpense, setExpenses, updateExpense } = expensesSlice.actions;

export default expensesSlice.reducer;