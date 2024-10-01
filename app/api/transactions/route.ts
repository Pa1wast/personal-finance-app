import { NextResponse } from "next/server";
import data from "../data.json";

const { transactions } = data;

export async function GET(request: Request) {
  const url = new URL(request.url);

  // Extract start and end parameters from the query
  const startParam = url.searchParams.get("start");
  const endParam = url.searchParams.get("end");

  // Parse start and end values, defaulting to 0 and total length of transactions
  const start = startParam ? parseInt(startParam) : 0;
  const end = endParam ? parseInt(endParam) : transactions.length;

  // Slice the transactions array based on start and end
  const limitedTransactions = transactions.slice(start, end);

  // Return limited transactions and the total number of transactions
  return NextResponse.json({
    transactions: limitedTransactions,
    totalTransactions: transactions.length,
  });
}
