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

export async function getTransactions(length: number) {
  const url = `http://localhost:3000/api/transactions?length=${length}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}
