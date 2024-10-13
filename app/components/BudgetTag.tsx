import { convertToCurrency } from "../_lib/helpers";

export default function BudgetTag({
  category,
  maximum,
  color,
  isCompact = true,
  spent,
  isLast,
}: {
  category: string;
  maximum: number;
  color: string;
  isCompact: boolean;
  spent: number;
  isLast?: boolean;
}) {
  if (isCompact)
    return (
      <li className="flex h-10 max-w-xs items-center gap-2 text-xs text-grey-900">
        <span
          style={{ backgroundColor: color }}
          className="block h-full w-1 rounded-full"
        ></span>
        <div className="space-y-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-extralight">
            {category}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
            {convertToCurrency(maximum)}
          </p>
        </div>
      </li>
    );

  return (
    <li
      className={`flex items-center justify-between py-6 text-grey-900 ${isLast ? "" : "border-b"}`}
    >
      <div className="flex h-full items-center gap-4 text-xs">
        <span
          style={{ backgroundColor: color }}
          className="block h-6 w-1 rounded-full"
        ></span>
        <p className="self-center overflow-hidden text-ellipsis whitespace-nowrap font-extralight">
          {category}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
          {convertToCurrency(spent, 2)}
        </p>

        <p className="text-xs text-grey-500">of {convertToCurrency(maximum)}</p>
      </div>
    </li>
  );
}
