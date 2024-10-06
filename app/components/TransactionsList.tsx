import Transaction from "./Transaction";

export default function TransactionsList({ transactions }) {
  return (
    <div className="h-full w-full overflow-y-auto px-2 text-xs font-thin text-beige-500">
      {/* Table Header */}
      <div className="hidden grid-cols-4 gap-2 border-b border-gray-100 pb-2 text-xs font-thin sm:grid">
        <p>Recipient / Sender</p>
        <p>Category</p>
        <p>Transaction Date</p>
        <p className="text-right">Amount</p>
      </div>

      {/* Table Rows */}
      <div className="h-full">
        {/* Row */}
        {transactions.length ? (
          transactions.map((transaction, index) => (
            <Transaction
              key={index + "-" + Math.random()}
              transaction={transaction}
              isLast={index === transactions.length - 1}
            />
          ))
        ) : (
          <div className="grid h-full items-center">
            <p className="text-center text-xl">No transactions found!</p>
          </div>
        )}
      </div>
    </div>
  );
}
