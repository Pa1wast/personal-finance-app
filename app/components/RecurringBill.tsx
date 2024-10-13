import Image from "next/image";
import {
  convertToCurrency,
  formatDate,
  getOrdinalSuffix,
} from "../_lib/helpers";
import { differenceInDays, getDate, isPast, isSameDay } from "date-fns";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

export default function RecurringBill({ transaction, isLast = false }) {
  const { name, avatar, amount, category, date } = transaction;

  const isPaid = isPast(date) || isSameDay(date, new Date());
  const isDue = !isPast(date) && differenceInDays(date, new Date()) <= 5;

  const monthDay = getDate(date);
  const ordinal = getOrdinalSuffix(monthDay);

  return (
    <div
      className={`grid grid-cols-[1fr_max-content] items-center gap-4 border-gray-100 py-3 sm:grid-cols-3 sm:gap-2 ${isLast ? "" : "border-b"}`}
    >
      <div className="col-span-2 flex items-center gap-3 sm:col-auto">
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

      <div
        className={`flex gap-1 ${isPaid ? "text-green" : isDue ? "text-red" : "text-grey-500"}`}
      >
        <p>{`Monthly - ${monthDay}${ordinal}`}</p>
        {isPaid ? (
          <CheckCircleIcon className="size-4" />
        ) : differenceInDays(date, new Date()) <= 5 ? (
          <ExclamationCircleIcon className="size-4" />
        ) : (
          ""
        )}
      </div>

      {isDue ? (
        <p className="text-md text-right font-extrabold text-red">
          {convertToCurrency(amount < 0 ? amount * -1 : amount, 2)}
        </p>
      ) : (
        <p className="text-md text-right font-extrabold text-grey-900">
          {convertToCurrency(amount < 0 ? amount * -1 : amount, 2)}
        </p>
      )}
    </div>
  );
}
