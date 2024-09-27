import Card from "./components/Card";
import { getBalance } from "./lib/data-services";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default async function Home() {
  const { current, income, expenses } = await getBalance();

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
            <p className="text-lg font-extrabold">Saving Pot</p>

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
                <p className="text-3xl font-bold">$850</p>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 grid-rows-2 items-center gap-x-2">
              <div className="relative flex h-min max-w-xs flex-col pl-4 before:absolute before:left-0 before:h-[90%] before:w-1 before:rounded-full before:bg-green before:content-['']">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-light text-grey-500">
                  Savings
                </p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
                  $159
                </p>
              </div>

              <div className="relative flex h-min max-w-xs flex-col pl-4 before:absolute before:left-0 before:h-[90%] before:w-1 before:rounded-full before:bg-cyan before:content-['']">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-light text-grey-500">
                  Christmas Gift
                </p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
                  $40
                </p>
              </div>

              <div className="relative flex h-min max-w-xs flex-col pl-4 before:absolute before:left-0 before:h-[90%] before:w-1 before:rounded-full before:bg-purpleDark before:content-['']">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-light text-grey-500">
                  Concert Ticket
                </p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
                  $110
                </p>
              </div>

              <div className="relative flex h-min max-w-xs flex-col pl-4 before:absolute before:left-0 before:h-[90%] before:w-1 before:rounded-full before:bg-yellow before:content-['']">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-light text-grey-500">
                  New Laptop
                </p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
                  $10
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row-span-2 rounded-lg bg-white p-10">Budgets</div>
        <div className="row-span-3 rounded-lg bg-white p-10">Transactions</div>
        <div className="col-start-2 row-span-2 rounded-lg bg-white p-10">
          Recurring Bills
        </div>
      </div>
    </div>
  );
}
