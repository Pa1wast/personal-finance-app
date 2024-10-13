"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../types/types";
import {
  HomeIcon,
  ArrowsUpDownIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const links: navLinks = [
  {
    name: "Overview",
    href: "/",
  },
  {
    name: "Transactions",
    href: "/transactions",
  },
  {
    name: "Budgets",
    href: "/budgets",
  },
  {
    name: "Pots",
    href: "/pots",
  },
  {
    name: "Recurring Bills",
    href: "/bills",
  },
  {
    name: "Account",
    href: "/account",
  },
];

function NavLinks({ isMinimized }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-1 px-2 pt-2 lg:max-h-max lg:flex-col lg:justify-start lg:pl-0 lg:pr-1">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li
            key={link.name}
            className={`group flex flex-1 flex-col items-center rounded-t-lg border-b-4 p-3 text-sm transition-all duration-200 lg:w-[90%] lg:flex-row lg:rounded-br-xl lg:rounded-tl-none lg:rounded-tr-xl lg:border-b-0 lg:border-l-4 ${
              isActive
                ? "border-green bg-beige-100 text-grey-900"
                : "border-transparent text-grey-300 hover:text-grey-100"
            }`}
          >
            <Link
              href={link.href}
              className={`lg:p4 flex flex-col items-center gap-3 rounded-lg font-bold lg:flex-row ${
                isActive ? "text-grey-900" : "group-hover:text-grey-100"
              }`}
            >
              {getIcon(
                link.name,
                `size-4 lg:size-6 md:size-5 ${
                  isActive
                    ? "text-green"
                    : "group-hover:text-grey-100 text-grey-300"
                }`,
              )}
              <span
                className={`hidden md:block ${isMinimized ? "lg:hidden" : ""}`}
              >
                {link.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavLinks;

function getIcon(linkName: string, className: string) {
  const name = linkName.toLowerCase().replace(" ", "-");

  switch (name) {
    case "overview":
      return <HomeIcon className={className} />;
    case "transactions":
      return <ArrowsUpDownIcon className={className} />;
    case "budgets":
      return <ChartPieIcon className={className} />;
    case "pots":
      return <CurrencyDollarIcon className={className} />;
    case "recurring-bills":
      return <BanknotesIcon className={className} />;
    case "account":
      return <UserIcon className={className} />;
  }
}
