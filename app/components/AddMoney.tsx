"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CloseModalButton from "./CloseModalButton";
import { ChevronDownIcon, ChevronUpIcon, DollarSign } from "lucide-react";
import { useState } from "react";
import { updateBudget, updatePot } from "../lib/actions";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";
import { convertToCurrency } from "../lib/helpers";

function AddMoney({ pot }) {
  const { id, name, target, total, theme } = pot;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [amount, setAmount] = useState("");

  const hasReachedTarget = total + Number(amount) >= target;

  const barPercentage = Number(((total / target) * 100).toFixed(2));

  const addedBarPercentage = hasReachedTarget
    ? Number((100 - barPercentage).toFixed(2))
    : Number(((Number(amount) / target) * 100).toFixed(2));
  const barWidth = barPercentage.toString().concat("%");
  const addedBarWidth =
    Number(amount) > 0 ? addedBarPercentage.toString().concat("%") : "0%";

  const totlPercentage = (barPercentage + addedBarPercentage)
    .toFixed(2)
    .concat("%");

  function handleCloseModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("isAddMoneyModalOpen");
    params.delete("id");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  async function handleSubmit(formData) {
    if (!formData) return;
    try {
      await updatePot(formData);
      handleCloseModal();
      toast.success("Money was successfully added");
    } catch (error) {
      toast.error("Could not add money");
      console.error(error);
    }
  }

  return (
    <>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-50"></div>

      <div className="absolute left-[50%] top-[50%] z-20 w-[95%] translate-x-[-50%] translate-y-[-50%] space-y-10 rounded-lg bg-white px-7 py-5 md:w-[75%] lg:w-[50vw]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add to ‘{name}’</h2>
          <CloseModalButton onCloseModal={handleCloseModal} />
        </div>

        <p>
          Add money to your pot to keep it separate from your main balance. As
          soon as you add this money, it will be deducted from your current
          balance.
        </p>

        <div className="relative space-y-4">
          <div className="flex justify-between">
            <p className="text-sm text-grey-500">New Amount</p>
            <p className="text-2xl font-bold">
              {convertToCurrency(total + Number(amount), 2)}
            </p>
          </div>

          <div className="w-full">
            <div className="flex h-2 w-full overflow-hidden rounded-lg bg-beige-100">
              <div
                className="z-10 h-full rounded-l-lg bg-grey-900"
                style={{ width: barWidth }}
              ></div>

              <span className="block h-full w-[2px] bg-beige-100"></span>

              <div
                className="z-10 h-full rounded-r-lg bg-green duration-300"
                style={{ width: addedBarWidth }}
              ></div>
            </div>

            <div className="flex justify-between">
              {Number(amount) > 0 ? (
                <p className="mt-2 text-xs font-bold text-green">
                  {totlPercentage}
                </p>
              ) : (
                <p className="mt-2 text-xs font-bold text-grey-500">
                  {totlPercentage}
                </p>
              )}

              <p className="mt-2 text-xs text-grey-500">
                Target of {convertToCurrency(target, 2)}
              </p>
            </div>
          </div>

          {hasReachedTarget && (
            <span className="absolute bottom-[-20px] right-0 block text-xs font-thin text-green">
              You have reached the target!
            </span>
          )}
        </div>

        <form action={handleSubmit} className="space-y-6">
          <input hidden value={id} name="potId" />
          <div className="space-y-1">
            <label htmlFor="target" className="text-xs font-bold text-grey-500">
              Amount to Add
            </label>
            <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
              <DollarSign className="ml-4 size-5 cursor-pointer text-grey-500 group-hover:text-grey-900" />

              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  if (isNaN(+e.target.value)) return;
                  const inputLength = e.target.value.length;
                  const targetLength = amount.toString().length;

                  if (hasReachedTarget) {
                    if (inputLength < targetLength) setAmount(e.target.value);
                    return;
                  }

                  setAmount(e.target.value);
                }}
                required
                id="target"
                name="target"
                className="h-full w-full rounded-lg px-4 py-3 outline-none placeholder:text-beige-500"
              />
            </div>
          </div>

          <SubmitButton pendingLabel="Confirming..." disabled={!amount}>
            Confirm Addition
          </SubmitButton>
        </form>
      </div>
    </>
  );
}

export default AddMoney;
