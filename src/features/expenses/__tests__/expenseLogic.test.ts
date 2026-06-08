test("calculates total expenses correctly", () => {
  const expenses = [
    { amount: 10 },
    { amount: 20 },
    { amount: 5.5 },
  ];

  const total = expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  expect(total).toBe(35.5);
});


test("returns three most recent expenses", () => {
  const expenses = [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ];

  const recent = expenses
    .slice(-3)
    .reverse();

  expect(recent.map(e => e.id))
    .toEqual(["5", "4", "3"]);
});

describe("Expense business logic", () => {
  const isExpenseValid = (
    title: string,
    amount: string
  ) => {
    return !!title && !!amount;
  };

  test("rejects empty title", () => {
    expect(
      isExpenseValid("", "15")
    ).toBe(false);
  });

  test("accepts valid expense", () => {
    expect(
      isExpenseValid("Coffee", "15")
    ).toBe(true);
  });
});