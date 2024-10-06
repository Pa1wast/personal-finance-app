"use client";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";

function MinimizeMenu({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-8 ml-3 mt-auto hidden items-center gap-2 self-start text-grey-300 transition-all duration-200 hover:text-grey-100 lg:flex"
    >
      <ChevronDoubleLeftIcon className="size-6" />
      <span>Minimize Menu</span>
    </button>
  );
}

export default MinimizeMenu;
