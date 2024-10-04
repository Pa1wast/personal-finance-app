import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const pot = await request.json();

    return NextResponse.json({
      status: 201,
      message: "Pot updated successfully",
      budget: pot,
    });
  } catch (error) {
    console.error("Error in POST request handler:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update pot",
      error: error.message,
    });
  }
}
