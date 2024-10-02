"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

function PaginationControls({ itemsPerPage, totalItems, fallBackPage }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = itemsPerPage;
  const totalPages = Math.ceil(totalItems / perPage);

  function updatePageParam(newPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  }

  if (fallBackPage) updatePageParam(fallBackPage);

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
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-beige-500 px-6 py-3 text-xs hover:bg-beige-500 hover:text-beige-100 disabled:pointer-events-none disabled:opacity-0"
      >
        <ChevronLeft className="size-4" /> <span>Prev</span>
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleSelectPage(index + 1)} // Index starts from 0, so add 1
            className={`aspect-square w-8 rounded-lg border text-xs hover:text-beige-100 ${
              currentPage === index + 1
                ? "border-grey-900 bg-grey-900 text-beige-100" // Active page styling
                : "border-beige-500 hover:bg-beige-500 hover:text-beige-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-beige-500 px-6 py-3 text-xs hover:bg-beige-500 hover:text-beige-100 disabled:pointer-events-none disabled:opacity-0"
      >
        <span>Next</span> <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

export default PaginationControls;
