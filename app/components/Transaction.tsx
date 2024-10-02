import Image from "next/image";
import { convertToCurrency, formatDate } from "../lib/helpers";

export default function Transaction({ transaction, isLast = false }) {
  const { name, avatar, category, amount, date } = transaction;
  return (
    <div
      className={`grid grid-cols-4 items-center gap-2 border-gray-100 py-3 ${isLast ? "border-b" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-7 w-7 overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt={name}
            fill
            className="absolute object-cover"
          />
        </div>
        <p className="text-md font-extrabold text-grey-900">{name}</p>
      </div>
      <p>{category}</p>
      <p>{formatDate(date)}</p>

      {amount > 0 ? (
        <p className="text-md text-right font-extrabold text-green">
          {convertToCurrency(amount, 2)}
        </p>
      ) : (
        <p className="text-md text-right font-extrabold text-grey-900">
          {convertToCurrency(amount, 2)}
        </p>
      )}
    </div>
  );
}
