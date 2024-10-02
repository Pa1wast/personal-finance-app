"use client";

import { useSearchParams } from "next/navigation";
import Logo from "./Logo";
import MinimizeMenu from "./MinimizeMenu";
import NavLinks from "./NavLinks";
import ExpandMenu from "./ExpandMenu";
import { useState } from "react";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      className={`flex overflow-hidden duration-500 ${isMinimized ? "w-min pr-4" : "w-[18%]"} flex-col gap-16 rounded-br-2xl rounded-tr-2xl bg-grey-900`}
    >
      <Logo className={`ml-3 mt-6 ${isMinimized ? "opacity-0" : ""}`} />
      <NavLinks isMinimized={isMinimized} />
      {isMinimized ? (
        <ExpandMenu onClick={() => setIsMinimized(false)} />
      ) : (
        <MinimizeMenu onClick={() => setIsMinimized(true)} />
      )}
    </div>
  );
}
