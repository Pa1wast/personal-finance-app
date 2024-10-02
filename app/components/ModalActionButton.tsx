"use client";

import { useSearchParams, useRouter } from "next/navigation";

function ModalActionButton({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("isModalOpen", "true");
    router.push(`?${params.toString()}`);
  }

  return (
    <button
      onClick={handleClick}
      className="text-md rounded-lg bg-grey-900 p-3 text-grey-100 hover:bg-grey-500"
    >
      {children}
    </button>
  );
}

export default ModalActionButton;
