import * as expenseApi from "../expenseApi";
import { createExpenseForCurrentUser, deleteExpenseForCurrentUser, updateExpenseForCurrentUser } from "../expenseService";

jest.mock(
  "@react-native-async-storage/async-storage",
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(
      "@react-native-async-storage/async-storage/jest/async-storage-mock"
    )
);

jest.mock("../storageApi", () => ({
  uploadReceipt: jest.fn(),
  deleteReceipt: jest.fn(),
}));

jest.mock("../expenseApi", () => ({
  createExpense: jest.fn(),
  deleteExpenseCloud: jest.fn(),
  updateExpenseCloud: jest.fn(),
}));


test("creates cloud expense when user is logged in", async () => {
  const mockCreateExpense = jest.spyOn(
    expenseApi,
    "createExpense"
  );

  mockCreateExpense.mockResolvedValue({
    data: { id: "123" },
    error: null,
  });

  const expense = {
    id: "1",
    title: "Coffee",
    amount: 5,
    category: "Food",
    date: "2026",
    currency: "USD",
  };

  await createExpenseForCurrentUser(
    expense,
    "user123"
  );

  expect(mockCreateExpense)
    .toHaveBeenCalledWith(
      expense,
      "user123"
    );
});

test("deletes cloud expense when user logged in", async () => {
  const mockDelete = jest.spyOn(
    expenseApi,
    "deleteExpenseCloud"
  );

  mockDelete.mockResolvedValue({
    error: null,
  });

  await deleteExpenseForCurrentUser(
    "expense123",
    "user123"
  );

  expect(mockDelete)
    .toHaveBeenCalledWith("expense123");
});

test("updates cloud expense when user logged in", async () => {
  const mockUpdate = jest.spyOn(
    expenseApi,
    "updateExpenseCloud"
  );

  mockUpdate.mockResolvedValue({
    data: {},
    error: null,
  });

  const expense = {
    id: "1",
    title: "Coffee",
    amount: 10,
    category: "Food",
    date: "2026",
    currency: "USD",
  };

  await updateExpenseForCurrentUser(
    expense,
    "user123"
  );

  expect(mockUpdate)
    .toHaveBeenCalledWith(expense);
});
