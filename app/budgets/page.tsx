import { BudgetChart } from "../components/BudgetChart";
import BudgetTag from "../components/BudgetTag";
import { getBudgets, getTransactions } from "../lib/data-services";
import BudgetCard from "../components/BudgetCard";

export default async function Page() {
  const { transactions } = await getTransactions(
    0,
    49,
    undefined,
    undefined,
    "latest",
  );
  const budgets = await getBudgets();

  const budgetsWithTotalSpent = budgets.map((budget) => {
    const amountSpent = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((acc, cur) => (cur.amount < 0 ? acc + cur.amount * -1 : 0), 0);

    return {
      category: budget.category,
      maximum: budget.maximum,
      theme: budget.theme,
      spent: amountSpent,
    };
  });

  return (
    <div className="h-full gap-3 space-y-2">
      <div className="flex justify-between">
        <h1 className="self-center text-3xl font-bold">Budgets</h1>

        <button className="text-md rounded-lg bg-grey-900 p-3 text-grey-100 hover:bg-grey-500">
          + Add New Budget
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 py-4">
        <div className="h-max space-y-4 rounded-lg bg-white p-4">
          <BudgetChart chartData={budgetsWithTotalSpent} />

          <h3 className="mb-3 text-lg font-bold">Spending Summary</h3>

          <ul className="divide-y">
            {budgetsWithTotalSpent.map((budget, index) => (
              <BudgetTag
                key={budget.name + "-" + index}
                category={budget.category}
                maximum={budget.maximum}
                color={budget.theme}
                isCompact={false}
                spent={budget.spent}
              />
            ))}
          </ul>
        </div>

        <ul className="col-span-2 space-y-4">
          {budgets.map((budget, index) => (
            <BudgetCard key={budget.category + "-" + index} budget={budget} />
          ))}
        </ul>
      </div>
    </div>
  );
}
