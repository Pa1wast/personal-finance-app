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
      className={`w-full rounded-lg p-6 ${isPrimary ? "bg-grey-900 text-grey-100" : "bg-white text-grey-900"}`}
    >
      <h4
        className={`mb-5 text-sm capitalize ${isPrimary ? "text-grey-100" : "text-grey-500"}`}
      >
        {label}
      </h4>
      <p className="text-4xl font-bold">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value)}
      </p>
    </div>
  );
}