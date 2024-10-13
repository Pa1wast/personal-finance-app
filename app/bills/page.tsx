import TransactionsList from "../components/TransactionsList";
import { getTransactions } from "../_lib/data-services";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import SearchAndFilter from "../components/SearchAndFilter";
import RecurringBillList from "../components/RecurringBillList";
import { differenceInDays, isPast, isSameDay } from "date-fns";
import { convertToCurrency } from "../_lib/helpers";

export default async function Page({ searchParams }) {
  const query = searchParams.query;
  const sortBy = searchParams.sortby ?? "latest";

  const { transactions } = await getTransactions(
    0,
    40,
    query,
    undefined,
    sortBy,
  );

  const { transactions: allTransactions } = await getTransactions(0, 100);

  const recurringBills = transactions.filter(
    (transaction) => transaction.recurring,
  );

  const allBills = allTransactions.filter(
    (transaction) => transaction.recurring,
  );

  const recurringBillsWithPaidStatus = allBills.map((bill) => {
    const isPaid = isPast(bill.date) || isSameDay(bill.date, new Date());
    const isDue =
      !isPast(bill.date) && differenceInDays(bill.date, new Date()) <= 5;

    return { ...bill, isPaid, isDue };
  });

  const paidBills = recurringBillsWithPaidStatus.reduce(
    (acc, cur) =>
      cur.isPaid ? acc + (cur.amount < 0 ? cur.amount * -1 : cur.amount) : acc,
    0,
  );

  const dueBills = recurringBillsWithPaidStatus.reduce(
    (acc, cur) =>
      cur.isDue ? acc + (cur.amount < 0 ? cur.amount * -1 : cur.amount) : acc,
    0,
  );

  const totalUpcoming = recurringBillsWithPaidStatus.reduce(
    (acc, cur) =>
      !cur.isPaid ? acc + (cur.amount < 0 ? cur.amount * -1 : cur.amount) : acc,
    0,
  );

  const totalBills = paidBills + dueBills + totalUpcoming;

  return (
    <div className="flex h-full flex-col gap-3 px-4 py-6 pb-6">
      <h1 className="text-3xl font-bold">Recurring Bills</h1>

      <div className="flex h-full flex-col gap-4 py-4 lg:grid lg:grid-cols-3 lg:grid-rows-2">
        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
          <div className="flex flex-col space-y-4 rounded-lg bg-grey-900 px-6 py-4 text-grey-100 sm:flex-1">
            <CurrencyDollarIcon className="mb-8 size-10" />
            <h3 className="text-sm font-thin">Total Bills</h3>
            <p className="text-2xl font-bold">
              {convertToCurrency(totalBills, 2)}
            </p>
          </div>

          <div className="gap-2 space-y-4 rounded-lg bg-white px-6 py-4 text-grey-900 sm:flex-1">
            <h2 className="text-lg font-bold">Summary</h2>

            <div className="flex items-center justify-between">
              <p className="text-xs text-grey-500">Paid Bills</p>
              <p className="text-sm font-bold text-grey-900">
                {convertToCurrency(paidBills, 2)}
              </p>
            </div>

            <span className="mb-5 mt-5 block h-[1px] w-full bg-grey-100"></span>

            <div className="flex items-center justify-between">
              <p className="text-xs text-grey-500">Total Upcoming</p>
              <p className="text-sm font-bold text-grey-900">
                {convertToCurrency(totalUpcoming, 2)}
              </p>
            </div>

            <span className="mb-5 mt-5 block h-[1px] w-full bg-grey-100"></span>

            <div className="flex items-center justify-between">
              <p className="text-xs text-red">Due Soon</p>
              <p className="text-sm font-bold text-red">
                {convertToCurrency(dueBills, 2)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-max flex-col gap-5 rounded-lg bg-white px-2 py-4 lg:col-span-2 lg:w-full">
          <SearchAndFilter
            categoriesActive={false}
            options={{ placeholder: "bills" }}
          />
          <RecurringBillList transactions={recurringBills} />
        </div>
      </div>
    </div>
  );
}
