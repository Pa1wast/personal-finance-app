import { convertToCurrency } from "../_lib/helpers";

export default function PotTag({
  name,
  total,
  color,
}: {
  name: string;
  total: number;
  color: string;
}) {
  return (
    <div
      style={{ borderColor: color }}
      className={`flex h-min max-w-xs items-center justify-between gap-2 rounded-md border-2 p-1 text-xs text-grey-900`}
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-extralight">
        {name}
      </p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
        {convertToCurrency(total)}
      </p>
    </div>
  );
}
