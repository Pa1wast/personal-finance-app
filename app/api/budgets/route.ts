import { NextResponse } from "next/server";
import data from "../data.json";
const { budgets } = data;

export async function GET() {
  return NextResponse.json(budgets);
}
