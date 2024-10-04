import { ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";
import { convertToCurrency } from "../lib/helpers";
import { getTransactions } from "../lib/data-services";
import TransactionsOverviewList from "./TransactionsOverviewList";
import ModalActions from "./ModalActions";

export default async function BudgetCard({ budget }) {
  const { maximum, category, theme, id } = budget;
  const { transactions } = await getTransactions(
    0,
    49,
    undefined,
    category,
    "latest",
  );

  const amountSpent = transactions.reduce(
    (acc, cur) => (cur.amount < 0 ? acc + cur.amount * -1 : 0),
    0,
  );
  const remainingAmount = maximum - amountSpent;

  const barWidth =
    amountSpent > maximum
      ? "100%"
      : ((amountSpent / maximum) * 100).toString().concat("%");

  const displayedTransactions = transactions.slice(0, 3);

  return (
    <li className="relative space-y-4 rounded-lg bg-white p-4">
      <div className="flex items-center gap-4">
        <div
          style={{ backgroundColor: theme }}
          className="h-5 w-5 rounded-full"
        ></div>
        <h2 className="mr-auto text-2xl font-semibold capitalize">
          {category}
        </h2>

        <ModalActions id={id} />
      </div>

      <p className="text-sm text-grey-500">
        Maximum of <span>{convertToCurrency(maximum, 2)}</span>
      </p>

      <div className="h-8 w-full rounded-sm bg-beige-100 p-1">
        <div
          className="z-10 h-full rounded-sm bg-green"
          style={{ width: barWidth, backgroundColor: theme }}
        ></div>
      </div>

      <div className="flex">
        <div className="flex flex-1 gap-3">
          <span
            style={{ backgroundColor: theme }}
            className="block h-full w-1 rounded-full"
          ></span>
          <div className="space-y-2">
            <p className="text-sm text-grey-500">Spent</p>
            <p className="font-bold text-grey-900">
              {convertToCurrency(amountSpent, 2)}
            </p>
          </div>
        </div>

        <div className="flex flex-1 gap-3">
          <span className="block h-full w-1 rounded-full bg-beige-100"></span>
          <div className="space-y-2">
            <p className="text-sm text-grey-500">Free</p>
            {remainingAmount < 0 ? (
              <p className="font-bold text-red">
                {convertToCurrency(remainingAmount, 2)}
              </p>
            ) : (
              <p className="font-bold text-grey-900">
                {convertToCurrency(remainingAmount, 2)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-lg bg-beige-100 px-4 py-3">
        <div className="flex justify-between">
          <h1 className="self-center text-lg font-bold">Latest Spending</h1>

          <Link
            href={`/transactions/?sortby=latest&category=${category}`}
            className="group flex items-center text-xs font-extralight text-grey-300 hover:text-grey-900"
          >
            <span className="mr-2 duration-200 group-hover:mr-3">View All</span>

            <ArrowRightCircleIcon className="size-4" />
          </Link>
        </div>

        <TransactionsOverviewList transactions={displayedTransactions} />
      </div>
    </li>
  );
}
