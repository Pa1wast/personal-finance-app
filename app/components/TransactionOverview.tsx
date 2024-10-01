import Image from "next/image";
import { convertToCurrency, formatDate } from "../lib/helpers";

export default function TransactionOverview({
  transaction,
}: {
  transaction: { name: string; avatar: string; date: string; amount: number };
}) {
  const { name, avatar, date, amount } = transaction;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={avatar}
            alt={name}
            fill
            className="absolute object-cover"
          />
        </div>
        <p className="text-sm font-bold">{name}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        {amount > 0 ? (
          <p className="font-bold text-green">
            {"+" + convertToCurrency(amount, 2)}
          </p>
        ) : (
          <p className="font-bold text-grey-900">
            {convertToCurrency(amount, 2)}
          </p>
        )}

        <p className="text-sm text-grey-500">{formatDate(date)}</p>
      </div>
    </div>
  );
}
