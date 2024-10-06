"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

function SearchAndFilter({
  categories,
  categoriesActive = true,
  options = { placeholder: "transactions" },
}: {
  categories?: [];
  categoriesActive: boolean;
  options: {};
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();

    const query = e.target
      .closest("[data-search-container]")
      .querySelector("[data-search-input]").value;

    const params = new URLSearchParams();

    if (!query) params.delete("query");
    else params.set("query", query);

    router.push(`?${params.toString()}`);
  }

  function handleSortBy(sortBy) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortby", sortBy);

    router.push(`?${params.toString()}`);
  }

  function handleSelectCategory(category) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex justify-between gap-6 px-7 pt-6">
      <div
        data-search-container
        className={`group mr-auto flex flex-1 items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900 ${categoriesActive ? "max-w-[30%]" : "max-w-[50%]"}`}
      >
        <input
          onChange={(e) => !e.target.value && handleSearch(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e);
          }}
          data-search-input
          type="text"
          placeholder={`Search ${options.placeholder} by name`}
          className="h-full w-full rounded-lg px-4 py-3 text-xs outline-none placeholder:text-beige-500"
        />
        <button
          onClick={handleSearch}
          className="mx-4 my-3 cursor-pointer group-hover:text-black"
        >
          <MagnifyingGlassIcon className="size-4" />
        </button>
      </div>

      <div className="flex gap-2">
        <span className="self-center text-xs text-beige-500">Sorty by</span>
        <div
          onClick={() => setIsSortByOpen((cur) => !cur)}
          className="relative flex max-w-64 items-center justify-between overflow-hidden rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900"
        >
          <span className="pointer-events-none absolute right-0 top-[50%] flex aspect-square h-full w-8 translate-y-[-50%] items-center bg-white">
            {isSortByOpen ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronDownIcon className="size-4" />
            )}
          </span>
          <select
            value={searchParams.get("sortby") ?? "latest"}
            onChange={(e) => handleSortBy(e.target.value)}
            className="focus-visible::outline-none px-4 py-3 text-xs focus:outline-none active:outline-none"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="amount-asc">Amount - Low to high</option>
            <option value="amount-desc">Amount - High to low</option>
            <option value="name-asc">Name - [A-Z]</option>
            <option value="name-desc">Name - [Z-A]</option>
          </select>
        </div>
      </div>

      {categoriesActive && (
        <div className="flex gap-2">
          <span className="self-center text-xs text-beige-500">Category</span>
          <div
            onClick={() => setIsCategoryOpen((cur) => !cur)}
            className="relative flex max-w-64 items-center justify-between overflow-hidden rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900"
          >
            <span className="pointer-events-none absolute right-0 top-[50%] flex aspect-square h-full w-8 translate-y-[-50%] items-center bg-white">
              {isCategoryOpen ? (
                <ChevronUpIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              )}
            </span>
            <select
              value={searchParams.get("category") ?? "all"}
              onChange={(e) => handleSelectCategory(e.target.value)}
              className="focus-visible::outline-none mr-2 px-4 py-3 text-xs focus:outline-none active:outline-none"
            >
              <option value="all">All Transactions</option>
              {categories?.map((category, index) => (
                <option
                  key={category + "-" + index}
                  value={category.toLowerCase()}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchAndFilter;
