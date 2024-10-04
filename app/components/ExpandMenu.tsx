"use client";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";

function ExpandMenu({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-8 ml-3 mt-auto flex items-center gap-2 self-center text-grey-300 transition-all duration-200 hover:text-grey-100"
    >
      <ChevronDoubleRightIcon className="size-6" />
    </button>
  );
}

export default ExpandMenu;
