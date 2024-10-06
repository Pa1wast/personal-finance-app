import Image from "next/image";
import { convertToCurrency, formatDate } from "../lib/helpers";

export default function Transaction({ transaction, isLast = false }) {
  const { name, avatar, amount, category, date } = transaction;

  return (
    <div
      className={`grid grid-cols-[1fr_max-content] items-center gap-2 border-gray-100 py-3 sm:grid-cols-4 ${isLast ? "" : "border-b"}`}
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
      <p className="col-start-1 sm:col-auto">{category}</p>
      <p className="text-right sm:text-left">{formatDate(date)}</p>

      {amount > 0 ? (
        <p className="text-md col-start-2 row-start-1 text-right font-extrabold text-green sm:col-auto sm:row-auto">
          {convertToCurrency(amount, 2)}
        </p>
      ) : (
        <p className="text-md col-start-2 row-start-1 text-right font-extrabold text-grey-900 sm:col-auto sm:row-auto">
          {convertToCurrency(amount, 2)}
        </p>
      )}
    </div>
  );
}
