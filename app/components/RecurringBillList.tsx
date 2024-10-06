import RecurringBill from "./RecurringBill";
import Transaction from "./Transaction";

export default function RecurringBillList({ transactions }) {
  return (
    <div className="h-full w-full px-4 text-xs font-thin text-beige-500">
      {/* Table Header */}
      <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-2 text-xs font-thin">
        <p>Bill Title</p>
        <p>Due Date</p>
        <p className="text-right">Amount</p>
      </div>

      {/* Table Rows */}
      <div className="h-full">
        {/* Row */}
        {transactions.length ? (
          transactions.map((transaction, index) => (
            <RecurringBill
              key={index + "-" + Math.random()}
              transaction={transaction}
              isLast={index === transactions.length - 1}
            />
          ))
        ) : (
          <p className="absolute left-[50%] top-64 translate-x-[-50%] text-center text-xl">
            No bills found!
          </p>
        )}
      </div>
    </div>
  );
}
