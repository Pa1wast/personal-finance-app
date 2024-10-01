"use client";
import Image from "next/image";
import { convertToCurrency } from "../lib/helpers";

export default function TransactionsList({ transactions }) {
  return (
    <div className="h-full w-full px-4 text-xs font-thin text-beige-500">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-2 border-b border-gray-100 pb-2 text-xs font-thin">
        <p>Recipient / Sender</p>
        <p>Category</p>
        <p>Transaction Date</p>
        <p className="text-right">Amount</p>
      </div>

      {/* Table Rows */}
      <div className="h-full space-y-4">
        {/* Row */}

        {transactions.length ? (
          transactions.map((transaction, index) => (
            <div
              key={transaction.name + "-" + index}
              className={`grid grid-cols-4 items-center gap-2 border-gray-100 py-3 ${index < transactions.length - 1 ? "border-b" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={transaction.avatar}
                    alt={transaction.name}
                    fill
                    className="absolute object-cover"
                  />
                </div>
                <p className="text-md font-extrabold text-grey-900">
                  {transaction.name}
                </p>
              </div>
              <p>{transaction.category}</p>
              <p>{transaction.date}</p>

              {transaction.amount > 0 ? (
                <p className="text-md text-right font-extrabold text-green">
                  {convertToCurrency(transaction.amount, 2)}
                </p>
              ) : (
                <p className="text-md text-right font-extrabold text-grey-900">
                  {convertToCurrency(transaction.amount, 2)}
                </p>
              )}
            </div>
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
