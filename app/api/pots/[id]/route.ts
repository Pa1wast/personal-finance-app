import { NextResponse } from "next/server";
import data from "../../data.json";
const { pots } = data;

export async function GET(request: Request, { params }) {
  const id = Number(params.id);

  const pot = pots.find((pot) => pot.id === id);

  return NextResponse.json(pot);
}
