import { revalidatePath } from "next/cache";

export async function getBalance() {
  const res = await fetch("http://localhost:3000/api/balance");
  const data = await res.json();

  return data;
}

export async function getPots() {
  const res = await fetch("http://localhost:3000/api/pots");
  const data = await res.json();

  return data;
}

export async function getBudgets() {
  const url = `http://localhost:3000/api/budgets`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function getTransactions(start: number, end: number) {
  const url = `http://localhost:3000/api/transactions?start=${start}&end=${end}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}
