"use client";

import { useSearchParams, useRouter } from "next/navigation";
import CloseModalButton from "./CloseModalButton";
import { ChevronDownIcon, ChevronUpIcon, DollarSign } from "lucide-react";
import { useState } from "react";
import { createBudget } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import { toast } from "react-toastify";

function AddNewBudget() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  function handleCloseModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("isAddModalOpen");
    router.push(`?${params.toString()}`);
  }

  async function handleSubmit(formData) {
    if (!formData) return;
    try {
      await createBudget(formData);
      handleCloseModal();
      toast.success("Budget was successfully added");
    } catch (error) {
      toast.error("Could not add budget");
      console.error(error);
    }
  }

  return (
    <>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-50"></div>

      <div className="absolute left-[50%] top-[50%] z-20 w-[95%] translate-x-[-50%] translate-y-[-50%] space-y-10 rounded-lg bg-white px-7 py-5 md:w-[75%] lg:w-[50vw]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add new budget</h2>
          <CloseModalButton onCloseModal={handleCloseModal} />
        </div>

        <p>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </p>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="category"
              className="text-xs font-bold text-grey-500"
            >
              Budget Category
            </label>

            <div
              onClick={() => setIsCategoryOpen((cur) => !cur)}
              className="relative flex items-center justify-between overflow-hidden rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900"
            >
              <span className="pointer-events-none absolute right-0 top-[50%] flex aspect-square h-full w-8 translate-y-[-50%] items-center bg-white">
                {isCategoryOpen ? (
                  <ChevronUpIcon className="size-4" />
                ) : (
                  <ChevronDownIcon className="size-4" />
                )}
              </span>
              <select
                required
                id="category"
                name="category"
                className="focus-visible::outline-none w-full px-4 py-3 text-xs focus:outline-none active:outline-none"
              >
                <option value="general">General</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="maximum-amount"
              className="text-xs font-bold text-grey-500"
            >
              Maximum Spend
            </label>
            <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
              <DollarSign className="ml-4 size-5 cursor-pointer text-grey-500 group-hover:text-grey-900" />

              <input
                required
                type="text"
                id="maximum-amount"
                name="maximum-amount"
                className="h-full w-full rounded-lg px-4 py-3 text-xs outline-none placeholder:text-beige-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="theme" className="text-xs font-bold text-grey-500">
              Theme
            </label>

            <div
              onClick={() => setIsThemeOpen((cur) => !cur)}
              className="relative flex items-center justify-between overflow-hidden rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900"
            >
              <span className="pointer-events-none absolute right-0 top-[50%] flex aspect-square h-full w-8 translate-y-[-50%] items-center bg-white">
                {isThemeOpen ? (
                  <ChevronUpIcon className="size-4" />
                ) : (
                  <ChevronDownIcon className="size-4" />
                )}
              </span>

              <select
                required
                id="theme"
                name="theme"
                className="focus-visible::outline-none w-full px-4 py-3 text-xs focus:outline-none active:outline-none"
              >
                <option value="#277C78">Green</option>
                <option value="#597C7C">Turquoise</option>
                <option value="#7F9161">Army Green</option>
                <option value="#F2CDAC">Yellow</option>
                <option value="#CAB361">Gold</option>
                <option value="#BE6C49">Orange</option>
                <option value="#C94736">Red</option>
                <option value="#934F6F">Magenta</option>
                <option value="#82C9D7">Cyan</option>
                <option value="#3F82B2">Blue</option>
                <option value="#626070">Navy</option>
                <option value="#97A0AC">Navy Gray</option>
                <option value="#826CB0">Dark Purple</option>
                <option value="#AF81BA">Light Purple</option>
                <option value="#93674F">Brown</option>
              </select>
            </div>
          </div>
          <SubmitButton pendingLabel="Adding...">Add Budget</SubmitButton>
        </form>
      </div>
    </>
  );
}

export default AddNewBudget;
