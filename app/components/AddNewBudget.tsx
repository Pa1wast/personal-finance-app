"use client";

import { useSearchParams, useRouter } from "next/navigation";
import CloseModalButton from "./CloseModalButton";
import { ChevronDownIcon, ChevronUpIcon, DollarSign } from "lucide-react";
import { useState } from "react";
import { createBudget } from "../lib/actions";

function AddNewBudget() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  function handleCloseModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("isModalOpen", "false");
    router.push(`?${params.toString()}`);
  }

  return (
    <>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-50"></div>

      <div className="absolute left-[50%] top-[50%] z-20 w-[40vw] max-w-[750px] translate-x-[-50%] translate-y-[-50%] space-y-10 rounded-lg bg-white px-7 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add new budget</h2>
          <CloseModalButton onCloseModal={handleCloseModal} />
        </div>

        <p>
          Create a budget to track your spendings and maybe save some money!
        </p>

        <form action={createBudget} className="space-y-6">
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
                id="category"
                name="category"
                className="focus-visible::outline-none w-full px-4 py-3 focus:outline-none active:outline-none"
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
                type="text"
                id="maximum-amount"
                name="maximum-amount"
                className="h-full w-full rounded-lg px-4 py-3 outline-none placeholder:text-beige-500"
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
                id="theme"
                name="theme"
                className="focus-visible::outline-none w-full px-4 py-3 focus:outline-none active:outline-none"
              >
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="cyan">Cyan</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleCloseModal}
            className="text-md w-full rounded-lg bg-grey-900 p-3 text-grey-100 hover:bg-grey-500"
          >
            Add Budget
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNewBudget;
