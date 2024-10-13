import SearchAndFilter from "../components/SearchAndFilter";
import TransactionsList from "../components/TransactionsList";
import PaginationControls from "../components/PaginationControls";
import {
  getTransactions,
  getTransactionsCategories,
} from "../_lib/data-services";

export default async function Page({ searchParams }) {
  const query = searchParams.query;
  const sortBy = searchParams.sortby;
  const category = searchParams.category;
  const page = parseInt(searchParams.page) || 1;
  const perPage = 7;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const { transactions, totalTransactions } = await getTransactions(
    start,
    end,
    query,
    category,
    sortBy,
  );

  const totalPages = Math.ceil(totalTransactions / perPage);

  let fallBackPage;
  if (page > totalPages) fallBackPage = totalPages;

  const categories = await getTransactionsCategories();

  return (
    <div className="flex h-full flex-col gap-3">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <div className="flex h-full flex-col gap-5 overflow-y-auto rounded-lg bg-white px-2 py-4">
        <SearchAndFilter categories={categories} categoriesActive={true} />
        <TransactionsList transactions={transactions} />
        <PaginationControls
          itemsPerPage={perPage}
          totalItems={totalTransactions}
          fallBackPage={fallBackPage}
        />
      </div>
    </div>
  );
}
