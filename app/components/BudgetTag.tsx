import { convertToCurrency } from "../lib/helpers";

export default function BudgetTag({
  category,
  maximum,
  color,
}: {
  category: string;
  maximum: number;
  color: string;
}) {
  return (
    <div
      style={{ borderColor: color }}
      className={`flex h-min max-w-xs items-center justify-between gap-2 rounded-md border-2 p-1 text-xs text-grey-900`}
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-extralight">
        {category}
      </p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
        {convertToCurrency(maximum)}
      </p>
    </div>
  );
}
