import TransactionOverview from "./TransactionOverview";

export default function TransactionsOverviewList({
  transactions,
}: {
  transactions: {
    name: string;
    date: string;
    amount: number;
    avatar: string;
  }[];
}) {
  return (
    <ul>
      {transactions.map(
        (
          transaction: {
            name: string;
            date: string;
            amount: number;
            avatar: string;
          },
          index: number,
        ) => (
          <li key={transaction.name + "-" + transaction.date + "-" + index}>
            <TransactionOverview transaction={transaction} />
            {index < transactions.length - 1 && (
              <span className="mb-5 mt-5 block h-[1px] w-full bg-grey-100"></span>
            )}
          </li>
        ),
      )}
    </ul>
  );
}
