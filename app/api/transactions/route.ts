import { NextResponse } from "next/server";
import data from "../data.json";

const { transactions } = data;

export async function GET(request: Request) {
  const url = new URL(request.url);

  const lengthParam = url.searchParams.get("length");

  const length = lengthParam ? parseInt(lengthParam, 10) : transactions.length;

  const limitedTransactions = transactions.slice(0, length);

  return NextResponse.json(limitedTransactions);
}
