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
      className={`order-1 flex w-full overflow-hidden rounded-t-lg duration-500 lg:rounded-tl-none ${isMinimized ? "lg:w-min" : "lg:w-[18%]"} lg:order-0 lg:order-0 flex-row bg-grey-900 lg:flex-col lg:gap-16 lg:rounded-br-2xl lg:rounded-tr-2xl`}
    >
      <div className="ml-6 mt-8">
        <Logo isMinimized={isMinimized} />
      </div>
      <NavLinks isMinimized={isMinimized} />
      {isMinimized ? (
        <ExpandMenu onClick={() => setIsMinimized(false)} />
      ) : (
        <MinimizeMenu onClick={() => setIsMinimized(true)} />
      )}
    </div>
  );
}
