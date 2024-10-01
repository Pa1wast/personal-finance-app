export function convertToCurrency(value: number, toFixed: number = 0) {
  const convertedValue: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: toFixed,
    maximumFractionDigits: toFixed,
  }).format(value);

  return convertedValue;
}

export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const dateObj = new Date(date);

  const formatted = dateObj
    .toLocaleDateString("en-GB", options)
    .replace(",", "");

  return formatted;
}
