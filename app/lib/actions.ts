"use server";

export async function getBudgets() {
  const url = `http://localhost:3000/api/budgets`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function getBudget(id) {
  const url = `http://localhost:3000/api/budgets/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function createBudget(newBudget) {
  const url = "http://localhost:3000/api/budgets/";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function updateBudget(id) {
  //   const url = `http://localhost:3000/api/budgets/update/${id}`;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   return data;
}

export async function deleteBudget(id) {
  //   const url = `http://localhost:3000/api/budgets/delete/${id}`;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   return data;
}
