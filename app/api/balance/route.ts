import { NextResponse } from "next/server";
import data from "../data.json";
const { balance } = data;

export async function GET() {
  return NextResponse.json(balance);
}
