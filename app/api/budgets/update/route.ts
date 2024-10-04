import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const updatedBudget = await request.json();

    return NextResponse.json({
      status: 201,
      message: "Budget updated successfully",
      budget: updatedBudget,
    });
  } catch (error) {
    console.error("Error in POST request handler:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update budget",
      error: error.message,
    });
  }
}
