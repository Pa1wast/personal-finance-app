import Card from "./components/Card";
import { getBalance } from "./lib/data-services";

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
        <div className="rounded-lg bg-white p-10">Pots</div>
        <div className="row-span-2 rounded-lg bg-white p-10">Budgets</div>
        <div className="row-span-3 rounded-lg bg-white p-10">Transactions</div>
        <div className="col-start-2 row-span-2 rounded-lg bg-white p-10">
          Recurring Bills
        </div>
      </div>
    </div>
  );
}
