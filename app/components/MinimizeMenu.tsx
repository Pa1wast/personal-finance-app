"use client";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";

function MinimizeMenu({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-8 ml-3 mt-auto flex items-center gap-2 self-start text-grey-300 transition-all duration-200 hover:text-grey-100"
    >
      <ChevronDoubleLeftIcon className="size-6" />
      <span>Minimize Menu</span>
    </button>
  );
}

export default MinimizeMenu;
