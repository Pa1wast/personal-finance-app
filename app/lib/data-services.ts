export async function getBalance() {
  const res = await fetch("http://localhost:3000/api/balance");
  const data = await res.json();

  return data;
}
