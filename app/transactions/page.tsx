import SearchAndFilter from "../components/SearchAndFilter";
import TransactionsList from "../components/TransactionsList";
import PaginationControls from "../components/PaginationControls";
import { getTransactions } from "../lib/data-services";

export default async function Page({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const perPage = 5;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const { transactions, totalTransactions } = await getTransactions(start, end);

  return (
    <div className="flex h-full flex-col gap-3">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <div className="flex h-full flex-col gap-5 overflow-y-auto rounded-lg bg-white px-7 py-6">
        <SearchAndFilter />
        <TransactionsList transactions={transactions} />
        <PaginationControls
          itemsPerPage={perPage}
          totalItems={totalTransactions}
        />
      </div>
    </div>
  );
}
