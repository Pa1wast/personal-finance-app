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

// Path to the newBudgets.json file
const filePath = path.resolve(process.cwd(), "app/api/newBudgets.json");

export async function POST(request) {
  try {
    const newBudget = await request.json(); // Parse the incoming JSON data

    // Check if the file exists
    let existingBudgets = [];

    if (fs.existsSync(filePath)) {
      // Read the file if it exists
      const fileData = fs.readFileSync(filePath, "utf-8");
      existingBudgets = JSON.parse(fileData);
    }

    // Append the new budget to the existing budgets
    existingBudgets.push(newBudget);

    // Write the updated data back to the file
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
