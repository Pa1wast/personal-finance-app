"use client";

import Logo from "./Logo";
import MinimizeMenu from "./MinimizeMenu";
import NavLinks from "./NavLinks";
import ExpandMenu from "./ExpandMenu";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("isMinimized");

    if (storedValue) setIsMinimized(JSON.parse(storedValue));

    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady)
      localStorage.setItem("isMinimized", JSON.stringify(isMinimized));
  }, [isMinimized, isReady]);

  return (
    <div
      className={`flex overflow-hidden duration-500 ${isMinimized ? "w-min pr-4" : "w-[18%]"} flex-col gap-16 rounded-br-2xl rounded-tr-2xl bg-grey-900`}
    >
      <Logo isMinimized={isMinimized} />
      <NavLinks isMinimized={isMinimized} />
      {isMinimized ? (
        <ExpandMenu onClick={() => setIsMinimized(false)} />
      ) : (
        <MinimizeMenu onClick={() => setIsMinimized(true)} />
      )}
    </div>
  );
}
