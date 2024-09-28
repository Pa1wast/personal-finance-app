import Card from "./components/Card";
import { getBalance, getPots, getTransactions } from "./lib/data-services";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { convertToCurrency } from "./lib/helpers";
import PotTag from "./components/PotTag";
import Image from "next/image";
import TransactionOverview from "./components/TransactionOverview";

export default async function Home() {
  const { current, income, expenses } = await getBalance();
  const pots = await getPots();
  const transactions = await getTransactions(5);

  const totalSaved = pots.reduce(
    (acc: number, cur: { total: number }) => (acc += cur.total),
    0,
  );

  return (
    <div className="">
      <h1 className="mb-10 text-3xl font-bold">Overview</h1>

      <div className="mb-6 flex w-full justify-between gap-4">
        <Card label="Current Balance" value={current} isPrimary={true} />
        <Card label="Income" value={income} isPrimary={false} />
        <Card label="Expenses" value={expenses} isPrimary={false} />
      </div>

      <div className="grid grid-cols-2 grid-rows-4 gap-5">
        <div className="rounded-lg bg-white p-6">
          <div className="mb-6 flex justify-between">
            <p className="text-lg font-extrabold">Pots</p>

            <button className="group flex items-center text-sm font-extralight text-grey-300 hover:text-grey-900">
              <span className="mr-2 duration-200 group-hover:mr-3">
                See Details
              </span>
              <ArrowRightCircleIcon className="size-4" />
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-1 items-center gap-5 rounded-2xl bg-beige-100 p-6">
              <CurrencyDollarIcon className="size-10 text-green" />
              <div className="flex flex-col gap-3">
                <p className="text-sm font-light text-grey-500">Total Saved</p>
                <p className="text-3xl font-bold">
                  {convertToCurrency(totalSaved)}
                </p>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 grid-rows-2 items-center gap-3">
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

        <div className="row-span-2 rounded-lg bg-white p-10">
          <p className="text-lg font-extrabold">Budgets</p>
        </div>
        <div className="row-span-3 rounded-lg bg-white p-10">
          <p className="mb-6 text-lg font-extrabold">Transactions</p>

          <ul className="">
            {transactions.map(
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
                  {index < transactions.length - 1 && (
                    <span className="mb-4 mt-4 block h-[1px] w-full bg-grey-100"></span>
                  )}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="col-start-2 row-span-2 rounded-lg bg-white p-10">
          <p className="text-lg font-extrabold">Recurring Bills</p>
        </div>
      </div>
    </div>
  );
}
