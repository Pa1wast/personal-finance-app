import { convertToCurrency } from "../lib/helpers";

function RecurringBillsOverview({
  recurringBill,
}: {
  recurringBill: { name: string; amount: number };
}) {
  const { name, amount } = recurringBill;
  return (
    <div className="flex items-center justify-between rounded-xl border-l-4 border-green bg-beige-100 px-3 py-5">
      <p className="text-xs">{name}</p>

      <p className="font-bold text-grey-900">{convertToCurrency(amount, 2)}</p>
    </div>
  );
}

export default RecurringBillsOverview;
