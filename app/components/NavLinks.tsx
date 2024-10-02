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
];

function NavLinks({ isMinimized }) {
  const pathname = usePathname();

  return (
    <ul>
      {links.map((link) => {
        const isActive = pathname === link.href;

        if (isMinimized)
          return (
            <li
              key={link.name}
              className={`group flex items-center rounded-br-xl rounded-tr-xl border-l-4 text-sm transition-all duration-200 ${
                isActive
                  ? "border-green bg-beige-100 text-grey-900"
                  : "border-transparent text-grey-300 hover:text-grey-100"
              }`}
            >
              <Link
                href={link.href}
                className={`mt-auto inline-block rounded-lg p-4 font-bold ${
                  isActive ? "text-grey-900" : "group-hover:text-grey-100"
                }`}
              >
                {getIcon(
                  link.name,
                  `size-6 ${
                    isActive
                      ? "text-green"
                      : "group-hover:text-grey-100 text-grey-300"
                  }`,
                )}
              </Link>
            </li>
          );

        return (
          <li
            key={link.name}
            className={`group flex w-[90%] items-center rounded-br-xl rounded-tr-xl border-l-4 text-sm transition-all duration-200 ${
              isActive
                ? "border-green bg-beige-100 text-grey-900"
                : "border-transparent text-grey-300 hover:text-grey-100"
            }`}
          >
            {getIcon(
              link.name,
              `size-6 ml-4 ${
                isActive
                  ? "text-green"
                  : "group-hover:text-grey-100 text-grey-300"
              }`,
            )}

            <Link
              href={link.href}
              className={`mt-auto inline-block rounded-lg px-4 py-3 font-bold ${
                isActive ? "text-grey-900" : "group-hover:text-grey-100"
              }`}
            >
              {link.name}
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
  }
}
