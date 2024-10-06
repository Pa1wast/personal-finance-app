"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

function PaginationControls({ itemsPerPage, totalItems, fallBackPage }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = itemsPerPage;
  const totalPages = Math.ceil(totalItems / perPage);

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0,
  );

  if (fallBackPage) updatePageParam(fallBackPage);

  function updatePageParam(newPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  }

  function handlePrev() {
    if (currentPage === 1) return;
    updatePageParam(currentPage - 1);
  }

  function handleNext() {
    if (currentPage >= totalPages) return;
    updatePageParam(currentPage + 1);
  }

  function handleSelectPage(page) {
    updatePageParam(page);
  }

  return (
    <div className="mt-auto flex items-center justify-between">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-beige-500 p-2 text-xs hover:bg-beige-500 hover:text-beige-100 disabled:pointer-events-none disabled:opacity-0"
      >
        <ChevronLeft className="size-4" />{" "}
        <span className="hidden sm:block">Prev</span>
      </button>

      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, index) =>
          vw <= 500 && index === currentPage + 1 ? (
            <button
              data-index={index}
              key={index}
              onClick={handleNext}
              className={`aspect-square w-8 rounded-lg border border-beige-500 text-xs hover:bg-beige-500 hover:text-beige-100`}
            >
              ...
            </button>
          ) : (
            index >= currentPage - 1 && (
              <button
                data-index={index}
                key={index}
                onClick={() => handleSelectPage(index + 1)} // Index starts from 0, so add 1
                className={`aspect-square w-8 rounded-lg border text-xs hover:text-beige-100 ${
                  currentPage === index + 1
                    ? "border-grey-900 bg-grey-900 text-beige-100" // Active page styling
                    : "border-beige-500 hover:bg-beige-500 hover:text-beige-100"
                } ${vw <= 500 && index > currentPage + 1 && index !== totalPages - 1 ? "hidden" : ""} `}
              >
                {index + 1}
              </button>
            )
          ),
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-beige-500 px-2 py-2 text-xs hover:bg-beige-500 hover:text-beige-100 disabled:pointer-events-none disabled:opacity-0"
      >
        <span className="hidden sm:block">Next</span>{" "}
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

export default PaginationControls;
