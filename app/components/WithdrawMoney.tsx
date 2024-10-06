"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CloseModalButton from "./CloseModalButton";
import { DollarSign } from "lucide-react";
import { useState } from "react";
import { updatePot } from "../lib/actions";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";
import { convertToCurrency } from "../lib/helpers";

function WithdrawMoney({ pot }) {
  const { id, name, target, total } = pot;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [amount, setAmount] = useState("");

  const newAmount = total - Number(amount);
  const hasReachedLimit = Number(amount) > total;

  const barPercentage = Number(
    (((total - Number(amount)) / target) * 100).toFixed(2),
  );
  const subtractedBarPercentage = Number(((total / target) * 100).toFixed(2));

  const barWidth =
    barPercentage < 0 ? "0%" : barPercentage.toFixed(2).concat("%");

  const originalPercentage = Number(((total / target) * 100).toFixed(2));
  const subtractedBarWidth =
    subtractedBarPercentage < 0
      ? "0%"
      : (barPercentage - subtractedBarPercentage) * -1 > originalPercentage
        ? originalPercentage.toFixed(2).concat("%")
        : ((barPercentage - subtractedBarPercentage) * -1)
            .toFixed(2)
            .concat("%");

  function handleCloseModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("isWithdrawMoneyModalOpen");
    params.delete("id");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  async function handleSubmit(formData) {
    if (!formData) return;
    try {
      await updatePot(formData);
      handleCloseModal();
      toast.success("Money was successfully withdrawn");
    } catch (error) {
      toast.error("Could not withdraw money");
      console.error(error);
    }
  }

  return (
    <>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-50"></div>

      <div className="absolute left-[50%] top-[50%] z-20 w-[95%] translate-x-[-50%] translate-y-[-50%] space-y-10 rounded-lg bg-white px-7 py-5 md:w-[75%] lg:w-[50vw]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Withdraw from ‘{name}’</h2>
          <CloseModalButton onCloseModal={handleCloseModal} />
        </div>

        <p>
          Withdraw money from your pot. The amount will be subtracted from your
          saved balance.
        </p>

        <div className="relative space-y-4">
          <div className="flex justify-between">
            <p className="text-sm text-grey-500">Remaining Amount</p>
            <p className="text-2xl font-bold">
              {convertToCurrency(newAmount, 2)}
            </p>
          </div>

          <div className="w-full">
            <div className="flex h-2 w-full overflow-hidden rounded-lg bg-beige-100">
              <div
                className="z-10 h-full rounded-l-lg bg-grey-900 duration-300"
                style={{ width: barWidth }}
              ></div>

              <span
                className={`block h-full bg-beige-100 duration-300 ${hasReachedLimit ? "w-[0px]" : "w-[2px]"}`}
              ></span>

              <div
                className={`z-10 h-full bg-red duration-300 ${hasReachedLimit ? "rounded-lg" : "rounded-r-lg"} `}
                style={{ width: subtractedBarWidth }}
              ></div>
            </div>

            <div className="flex justify-between">
              <p className="mt-2 text-xs font-bold text-grey-500">{barWidth}</p>

              <p className="mt-2 text-xs text-grey-500">
                Target of {convertToCurrency(target, 2)}
              </p>
            </div>

            {hasReachedLimit && (
              <span className="absolute bottom-[-20px] right-0 block text-xs font-thin text-red">
                Can't withdraw that amount
              </span>
            )}
          </div>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <input hidden value={id} name="potId" />
          <div className="space-y-1">
            <label htmlFor="amount" className="text-xs font-bold text-grey-500">
              Amount to Withdraw
            </label>
            <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
              <DollarSign className="ml-4 size-5 cursor-pointer text-grey-500 group-hover:text-grey-900" />

              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  const inputLength = e.target.value.length;
                  const targetLength = amount.toString().length;
                  const value = +e.target.value;
                  if (value === 0 && Number(amount) === 0) return;
                  if (isNaN(value) || value < 0) return;

                  if (hasReachedLimit) {
                    if (inputLength < targetLength) setAmount(e.target.value);
                    return;
                  }

                  setAmount(e.target.value);
                }}
                required
                id="amount"
                name="amount"
                className="h-full w-full rounded-lg px-4 py-3 outline-none placeholder:text-beige-500"
              />
            </div>
          </div>

          <SubmitButton
            pendingLabel="Confirming..."
            disabled={!amount || hasReachedLimit}
          >
            Confirm Withdrawal
          </SubmitButton>
        </form>
      </div>
    </>
  );
}

export default WithdrawMoney;
