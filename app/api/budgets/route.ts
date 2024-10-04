import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import data from "../data.json";
import newBudgets from "../newBudgets.json";
const { budgets } = data;
const allBudgets = budgets.concat(newBudgets);

export async function GET() {
  return NextResponse.json(allBudgets);
}

const filePath = path.resolve(process.cwd(), "app/api/newBudgets.json");

export async function POST(request: Request) {
  try {
    const newBudget = await request.json();

    let existingBudgets = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      existingBudgets = JSON.parse(fileData);
    }

    existingBudgets.push(newBudget);

    fs.writeFileSync(
      filePath,
      JSON.stringify(existingBudgets, null, 2),
      "utf-8",
    );

    return NextResponse.json({
      status: 200,
      message: "Budget created and saved successfully",
      budget: newBudget,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to create budget",
      error: error.message,
    });
  }
}
