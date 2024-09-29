import { convertToCurrency } from "../lib/helpers";

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
    <div className={`relative flex h-min max-w-xs flex-col pl-3 text-xs`}>
      <p
        style={{ borderColor: color }}
        className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border p-1 font-extralight"
      >
        {name}
      </p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold">
        {convertToCurrency(total)}
      </p>
    </div>
  );
}
