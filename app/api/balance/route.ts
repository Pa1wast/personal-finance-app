import { NextResponse } from "next/server";
import data from "../data.json";
import { pool } from "../lib/db";
const { balance } = data;

export async function GET() {
  const result = await pool.query("SELECT * FROM users");

  return NextResponse.json(result.rows);
}
