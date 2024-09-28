import { convertToCurrency } from "../lib/helpers";

export default function Card({
  label,
  value,
  isPrimary = false,
}: {
  label: string;
  value: number;
  isPrimary: boolean;
}) {
  return (
    <div
      className={`w-full rounded-xl px-6 py-4 ${isPrimary ? "bg-grey-900 text-grey-100" : "bg-white text-grey-900"}`}
    >
      <h4
        className={`mb-5 text-xs capitalize ${isPrimary ? "text-grey-100" : "text-grey-500"}`}
      >
        {label}
      </h4>
      <p className="text-2xl font-bold">{convertToCurrency(value, 2)}</p>
    </div>
  );
}
