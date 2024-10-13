import { convertToCurrency } from "../_lib/helpers";

function RecurringBillsOverview({
  recurringBill,
}: {
  recurringBill: { name: string; amount: number; theme: string };
}) {
  const { name, amount, theme } = recurringBill;

  const color = !theme ? "#97A0AC" : theme;

  return (
    <div
      style={{ borderColor: color }}
      className="flex items-center justify-between rounded-xl border-l-4 border-grey-300 bg-beige-100 px-3 py-5"
    >
      <p className="text-xs">{name}</p>

      <p className="font-bold text-grey-900">{convertToCurrency(amount, 2)}</p>
    </div>
  );
}

export default RecurringBillsOverview;
