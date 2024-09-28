import { NextResponse } from "next/server";
import data from "../data.json";
const { pots } = data;

export async function GET() {
  return NextResponse.json(pots);
}
