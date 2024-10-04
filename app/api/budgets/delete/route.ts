import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({
      status: 201,
      message: "Budget deleted successfully",
    });
  } catch (error) {
    console.error("Error in POST request handler:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to delete budget",
      error: error.message,
    });
  }
}
