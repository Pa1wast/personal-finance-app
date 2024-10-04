import { NextResponse } from "next/server";
import data from "../../data.json";
import newBudgets from "../../newBudgets.json";
const { budgets } = data;
const allBudgets = budgets.concat(newBudgets);

export async function GET(request: Request, { params }) {
  const url = new URL(request.url);

  const id = Number(params.id);

  const budget = allBudgets.find((budget) => budget.id === id);

  return NextResponse.json(budget);
}
