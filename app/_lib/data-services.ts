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

export async function getTransactions(
  start: number,
  end: number,
  query?: string,
  category?: string,
  sortBy?: string,
) {
  const urlBase = "http://localhost:3000/api/transactions";
  let url = `${urlBase}?start=${start}&end=${end}`;

  if (query) {
    const hasQueryParams = url.includes("?");
    url += `${hasQueryParams ? "&" : "?"}query=${query}`;
  }

  if (category) {
    const hasQueryParams = url.includes("?");
    url += `${hasQueryParams ? "&" : "?"}category=${category}`;
  }

  if (sortBy) {
    const hasQueryParams = url.includes("?");
    url += `${hasQueryParams ? "&" : "?"}sortby=${sortBy}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function getTransactionsCategories() {
  const res = await fetch("http://localhost:3000/api/transactions/categories");
  const data = await res.json();

  return data;
}
