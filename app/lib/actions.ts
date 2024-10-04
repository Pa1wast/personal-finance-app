"use server";

import { revalidatePath } from "next/cache";

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

export async function createBudget(formData) {
  const url = "http://localhost:3000/api/budgets/";

  const newBudget = {
    id: Number(formData.get("id")),
    category: formData.get("category"),
    maximum: Number(formData.get("maximum-amount")),
    theme: formData.get("theme"),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBudget),
  });

  if (!res.ok) {
    throw new Error("Failed to create budget");
  }

  const data = await res.json();
  return data;
}

export async function updateBudget(formData) {
  const url = `http://localhost:3000/api/budgets/update?id=${formData.get("budgetId")}`;

  const updatedBudget = {
    id: Number(formData.get("budgetId")),
    category: formData.get("category"),
    maximum: Number(formData.get("maximum-amount")),
    theme: formData.get("theme"),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBudget),
  });

  if (!res.ok) {
    throw new Error("Failed to create budget");
  }

  revalidatePath("/budgets");
}

export async function deleteBudget(id) {
  const url = `http://localhost:3000/api/budgets/delete?${id}`;
  await fetch(url);
}

export async function getPot(id) {
  const url = `http://localhost:3000/api/pots/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function updatePot(formData) {
  const url = `http://localhost:3000/api/pots/update?id=${formData.get("potId")}`;

  const updatedPot = {
    id: Number(formData.get("potId")),
    name: formData.get("category"),
    target: Number(formData.get("target")),
    total: Number(formData.get("total")),
    theme: formData.get("theme"),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPot),
  });

  if (!res.ok) {
    throw new Error("Failed to update pot");
  }

  revalidatePath("/pots");
}

export async function deletePot(id) {
  const url = `http://localhost:3000/api/pots/delete?${id}`;
  await fetch(url);
}
