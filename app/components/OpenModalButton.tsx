"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

function OpenModalButton({ children, type, className, id }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "add") params.set("isAddModalOpen", "true");
    else if (type === "edit") {
      params.set("isEditModalOpen", "true");
      params.set("id", id);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

export default OpenModalButton;
