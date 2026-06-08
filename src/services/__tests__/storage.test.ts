jest.mock(
  "@react-native-async-storage/async-storage",
  () =>
    require(
      "@react-native-async-storage/async-storage/jest/async-storage-mock"
    )
);

import {
  saveExpenses,
  loadExpenses,
  clearGuestExpenses,
} from "../storage";

test("saves expenses", async () => {
  const expenses = [
    {
      id: "1",
      title: "Coffee",
      amount: 5,
      category: "Food",
      date: "2026",
      currency: "USD",
    },
  ];

  await saveExpenses(expenses);

  const loaded = await loadExpenses();

  expect(loaded.length).toBe(1);
});

test("returns empty array when storage empty", async () => {
  await clearGuestExpenses();

  const result = await loadExpenses();

  expect(result).toEqual([]);
});

test("clears expenses", async () => {
  const expenses = [
    {
      id: "1",
      title: "Coffee",
      amount: 5,
      category: "Food",
      date: "2026",
      currency: "USD",
    },
  ];

  await saveExpenses(expenses);

  await clearGuestExpenses();

  const result = await loadExpenses();

  expect(result).toEqual([]);
});
