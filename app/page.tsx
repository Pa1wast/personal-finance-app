import Card from "./components/Card";
import {
  getBalance,
  getBudgets,
  getPots,
  getTransactions,
} from "./lib/data-services";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { convertToCurrency } from "./lib/helpers";
import PotTag from "./components/PotTag";
import TransactionOverview from "./components/TransactionOverview";
import RecurringBillsOverview from "./components/RecurringBillsOverview";
import { BudgetChart } from "./components/BudgetChart";
import BudgetTag from "./components/BudgetTag";

export default async function Home() {
  const { current, income, expenses } = await getBalance();
  const pots = await getPots();
  const transactions = await getTransactions(50);
  const budgets = await getBudgets();
  const recurringBills = transactions.filter(
    (transaction: { recurring: boolean }) => transaction.recurring,
  );

  const displayedTransactions = transactions.slice(0, 5);
  const displayedrecurringBills = recurringBills.slice(0, 3);

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
    <div className="">
      <h1 className="mb-8 text-3xl font-bold">Overview</h1>

      <div className="mb-4 flex w-full justify-between gap-4">
        <Card label="Current Balance" value={current} isPrimary={true} />
        <Card label="Income" value={income} isPrimary={false} />
        <Card label="Expenses" value={expenses} isPrimary={false} />
      </div>

      <div className="grid grid-cols-[2fr_1.5fr] grid-rows-[max-content_max-content_1fr] gap-5">
        <div className="rounded-lg bg-white p-4">
          <div className="mb-6 flex justify-between">
            <p className="text-md font-extrabold">Pots</p>

            <button className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900">
              <span className="mr-2 duration-200 group-hover:mr-3">
                See Details
              </span>
              <ArrowRightCircleIcon className="size-4" />
            </button>
          </div>

          <div className="flex gap-1">
            <div className="flex flex-1 items-center gap-5 rounded-2xl bg-beige-100 py-2 pl-5">
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

        <div className="row-span-2 rounded-lg bg-white p-4">
          <div className="mb-6 flex justify-between">
            <p className="text-md font-extrabold">Budgets</p>

            <button className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900">
              <span className="mr-2 duration-200 group-hover:mr-3">
                See Details
              </span>
              <ArrowRightCircleIcon className="size-4" />
            </button>
          </div>

          <div className="flex items-center">
            <BudgetChart chartData={budgetsWithTotalSpent} />
            <ul className="flex flex-col gap-4">
              {budgets.map((budget, index) => (
                <BudgetTag
                  key={budget.name + "-" + index}
                  category={budget.category}
                  maximum={budget.maximum}
                  color={budget.theme}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="row-span-2 rounded-lg bg-white p-4">
          <div className="mb-6 flex justify-between">
            <p className="text-md font-extrabold">Transactions</p>

            <button className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900">
              <span className="mr-2 duration-200 group-hover:mr-3">
                View All
              </span>
              <ArrowRightCircleIcon className="size-4" />
            </button>
          </div>

          <ul>
            {displayedTransactions.map(
              (
                transaction: {
                  name: string;
                  date: string;
                  amount: number;
                  avatar: string;
                },
                index: number,
              ) => (
                <li
                  key={transaction.name + "-" + transaction.date + "-" + index}
                >
                  <TransactionOverview transaction={transaction} />
                  {index < displayedTransactions.length - 1 && (
                    <span className="mb-5 mt-5 block h-[1px] w-full bg-grey-100"></span>
                  )}
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="col-start-2 rounded-lg bg-white p-4">
          <div className="mb-6 flex justify-between">
            <p className="text-md font-extrabold">Recurring Bills</p>

            <button className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900">
              <span className="mr-2 duration-200 group-hover:mr-3">
                See Details
              </span>
              <ArrowRightCircleIcon className="size-4" />
            </button>
          </div>

          <ul className="flex flex-col gap-3">
            {displayedrecurringBills.map(
              (
                recurringBill: {
                  name: string;
                  amount: number;
                },
                index: number,
              ) => (
                <li key={displayedrecurringBills.name + "-" + index}>
                  <RecurringBillsOverview recurringBill={recurringBill} />
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
