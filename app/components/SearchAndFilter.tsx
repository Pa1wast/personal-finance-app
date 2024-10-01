"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function SearchAndFilter() {
  return (
    <div className="flex justify-between gap-6">
      <div className="group mr-auto flex max-w-[30%] flex-1 items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
        <input
          type="text"
          placeholder="Search transaction"
          className="h-full w-full rounded-lg px-4 py-3 text-xs outline-none placeholder:text-beige-500"
        />
        <MagnifyingGlassIcon className="mx-4 my-3 size-5 cursor-pointer group-hover:text-black" />
      </div>

      <div className="flex gap-2">
        <span className="self-center text-xs text-beige-500">Sorty by</span>
        <select className="flex max-w-32 items-center justify-between rounded-lg border border-beige-500 px-4 py-3 outline-none hover:border-grey-900 focus:border-grey-900">
          <option>Latest</option>
        </select>
      </div>

      <div className="flex gap-2">
        <span className="self-center text-xs text-beige-500">Category</span>
        <select className="flex max-w-64 items-center justify-between rounded-lg border border-beige-500 px-4 py-3 outline-none hover:border-grey-900 focus:border-grey-900">
          <option>All transactions</option>
        </select>
      </div>
    </div>
  );
}

export default SearchAndFilter;
