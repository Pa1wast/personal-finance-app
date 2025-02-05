import Card from "./components/Card";
import {
  getBalance,
  getBudgets,
  getPots,
  getTransactions,
} from "./_lib/data-services";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { convertToCurrency } from "./_lib/helpers";
import PotTag from "./components/PotTag";
import { BudgetChart } from "./components/BudgetChart";
import BudgetTag from "./components/BudgetTag";
import TransactionsOverviewList from "./components/TransactionsOverviewList";
import RecurringBillsOverviewList from "./components/RecurringBillsOverviewList";
import Link from "next/link";

export default async function Home() {
  const { current, income, expenses } = await getBalance();
  const pots = await getPots();
  const { transactions } = await getTransactions(
    0,
    5,
    undefined,
    undefined,
    "latest",
  );
  const budgets = await getBudgets();

  const { transactions: bills } = await getTransactions(
    0,
    40,
    undefined,
    undefined,
    "latest",
  );

  const recurringBills = bills.filter(
    (transaction: { recurring: boolean }) => transaction.recurring,
  );

  const displayedTransactions = transactions.slice(0, 5);

  const displayedRecurringBillsWithThemes = recurringBills
    .map((bill) => {
      const matchedBudget = budgets.find(
        (budget) => budget.category === bill.category,
      );
      const theme = matchedBudget?.theme;
      return {
        ...bill,
        theme,
      };
    })
    .slice(0, 3);

  const totalSaved = pots.reduce(
    (acc: number, cur: { total: number }) => (acc += cur.total),
    0,
  );

  const budgetsWithTotalSpent = budgets.map((budget) => {
    const totalSpent = transactions
      .filter((transaction) => transaction.category === budget.category)
      .reduce((acc, cur) => acc + Math.abs(cur.amount), 0);

    return {
      category: budget.category,
      maximum: budget.maximum,
      theme: budget.theme,
      spent: totalSpent,
    };
  });

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Overview</h1>

      <div className="mb-4 flex w-full flex-col justify-between gap-4 sm:flex-row">
        <Card label="Current Balance" value={current} isPrimary={true} />
        <Card label="Income" value={income} isPrimary={false} />
        <Card label="Expenses" value={expenses} isPrimary={false} />
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[2fr_1.5fr] lg:grid-rows-[max-content_max-content_1fr]">
        <div className="rounded-lg bg-white p-4">
          <div className="mb-6 flex justify-between">
            <p className="text-md font-extrabold">Pots</p>

            <Link
              href="/pots"
              className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900"
            >
              <span className="mr-2 duration-200 group-hover:mr-3">
                See Details
              </span>

              <ArrowRightCircleIcon className="size-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 items-center gap-5 rounded-lg bg-beige-100 py-4 pl-5">
              <CurrencyDollarIcon className="size-12 text-green" />

              <div className="flex flex-col gap-3">
                <p className="text-sm font-light text-grey-500">Total Saved</p>

                <p className="text-4xl font-bold">
                  {convertToCurrency(totalSaved)}
                </p>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 grid-rows-2 items-center gap-1">
              {pots.map(
                (pot: {
                  name: string;
                  target: number;
                  total: number;
                  theme: string;
                }) => (
                  <PotTag
                    key={pot.name}
                    name={pot.name}
                    total={pot.total}
                    color={pot.theme}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        <div className="order-1 row-span-2 rounded-lg bg-white p-4">
          <div className="mb-6 flex justify-between">
            <p className="text-md font-extrabold">Budgets</p>

            <Link
              href="/budgets"
              className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900"
            >
              <span className="mr-2 duration-200 group-hover:mr-3">
                See Details
              </span>

              <ArrowRightCircleIcon className="size-4" />
            </Link>
          </div>

          <div className="flex items-center">
            <BudgetChart chartData={budgetsWithTotalSpent} />
            <ul className="flex flex-col gap-4">
              {budgets.slice(0, 3).map((budget, index) => (
                <BudgetTag
                  key={budget.name + "-" + index}
                  category={budget.category}
                  maximum={budget.maximum}
                  color={budget.theme}
                  isCompact={true}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="order-0 row-span-2 h-max rounded-lg bg-white p-4 lg:order-2 lg:col-span-1">
          <div className="mb-6 flex justify-between">
            <p className="text-md font-extrabold">Transactions</p>

            <Link
              href="/transactions"
              className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900"
            >
              <span className="mr-2 duration-200 group-hover:mr-3">
                View All
              </span>
              <ArrowRightCircleIcon className="size-4" />
            </Link>
          </div>

          <TransactionsOverviewList transactions={displayedTransactions} />
        </div>

        <div className="order-2 col-start-2 rounded-lg bg-white p-4">
          <div className="mb-6 flex justify-between">
            <p className="text-md font-extrabold">Recurring Bills</p>

            <Link
              href="/bills"
              className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900"
            >
              <span className="mr-2 duration-200 group-hover:mr-3">
                See Details
              </span>
              <ArrowRightCircleIcon className="size-4" />
            </Link>
          </div>

          <RecurringBillsOverviewList
            recurringBills={displayedRecurringBillsWithThemes}
          />
        </div>
      </div>
    </div>
  );
}
