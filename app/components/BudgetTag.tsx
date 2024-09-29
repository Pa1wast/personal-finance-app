import { before } from "node:test";
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
    <div className={`h-min max-w-xs flex-col text-xs text-grey-900`}>
      <p
        style={{ borderColor: color }}
        className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border p-1 font-extralight"
      >
        {category}
      </p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
        {convertToCurrency(maximum)}
      </p>
    </div>
  );
}
