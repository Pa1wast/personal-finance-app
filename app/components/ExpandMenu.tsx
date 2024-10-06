"use client";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

function ExpandMenu({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-8 mt-auto hidden items-center gap-2 self-center text-grey-300 transition-all duration-200 hover:text-grey-100 lg:flex"
    >
      <ChevronDoubleRightIcon className="size-6" />
    </button>
  );
}

export default ExpandMenu;
