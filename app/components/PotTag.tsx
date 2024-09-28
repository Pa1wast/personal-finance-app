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
    <div
      className={`relative flex h-min max-w-xs flex-col pl-4 before:absolute before:left-0 before:h-[90%] before:w-[3px] before:rounded-full before:bg-grey-300 before:content-['']`}
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-light text-grey-500">
        {name}
      </p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
        {convertToCurrency(total)}
      </p>
    </div>
  );
}
