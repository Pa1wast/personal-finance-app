"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter } from "next/navigation";

function CloseModalButton({ onCloseModal }) {
  return (
    <button
      onClick={onCloseModal}
      className="text-grey-500 hover:text-grey-300"
    >
      <XCircleIcon className="size-6" />
    </button>
  );
}

export default CloseModalButton;
