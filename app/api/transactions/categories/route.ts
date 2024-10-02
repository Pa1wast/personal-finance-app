import { NextResponse } from "next/server";
import data from "../../data.json";

const { transactions } = data;

export async function GET() {
  const categories = transactions.map((transaction) => transaction.category);

  const uniqueCategories = Array.from(new Set(categories));

  return NextResponse.json(uniqueCategories);
}
