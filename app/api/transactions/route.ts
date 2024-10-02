import { NextResponse } from "next/server";
import data from "../data.json";

const { transactions } = data;

export async function GET(request: Request) {
  const url = new URL(request.url);

  const query = url.searchParams.get("query");
  const sortBy = url.searchParams.get("sortby");
  const category = url.searchParams.get("category");
  const startParam = url.searchParams.get("start");
  const endParam = url.searchParams.get("end");

  let searchedTransactions;

  if (query)
    searchedTransactions = transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(query),
    );

  let adjustedTransactions = searchedTransactions
    ? searchedTransactions
    : transactions;

  if (category && category !== "all") {
    adjustedTransactions = adjustedTransactions.filter(
      (transaction) =>
        transaction.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (sortBy) {
    switch (sortBy) {
      case "amount-asc":
        adjustedTransactions = adjustedTransactions.sort(
          (a, b) => a.amount - b.amount,
        );
        break;
      case "amount-desc":
        adjustedTransactions = adjustedTransactions.sort(
          (a, b) => b.amount - a.amount,
        );
        break;
      case "latest":
        adjustedTransactions = adjustedTransactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        adjustedTransactions = adjustedTransactions.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "name-asc":
        adjustedTransactions = adjustedTransactions.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;
      case "name-desc":
        adjustedTransactions = adjustedTransactions.sort((a, b) =>
          b.name.localeCompare(a.name),
        );
        break;
      default:
        break;
    }
  }

  const start = startParam ? parseInt(startParam) : 0;
  const end = endParam ? parseInt(endParam) : transactions.length;

  const result = adjustedTransactions.slice(start, end);

  return NextResponse.json({
    transactions: result,
    totalTransactions: adjustedTransactions.length,
  });
}
