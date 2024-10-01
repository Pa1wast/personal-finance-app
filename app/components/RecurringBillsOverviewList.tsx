import RecurringBillsOverview from "./RecurringBillsOverview";

export default function RecurringBillsList({
  recurringBills,
}: {
  recurringBills: {
    name: string;
    amount: number;
    theme: string;
  }[];
}) {
  return (
    <ul className="flex flex-col gap-3">
      {recurringBills.map(
        (
          recurringBill: {
            name: string;
            amount: number;
            theme: string;
          },
          index: number,
        ) => (
          <li key={recurringBill.name + "-" + index}>
            <RecurringBillsOverview recurringBill={recurringBill} />
          </li>
        ),
      )}
    </ul>
  );
}
