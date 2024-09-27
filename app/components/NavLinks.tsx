'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '../types/types';

const links: navLinks = [
  {
    name: 'Overview',
    href: '/',
  },
  {
    name: 'Transactions',
    href: '/transactions',
  },
  {
    name: 'Budgets',
    href: '/budgets',
  },
  {
    name: 'Pots',
    href: '/pots',
  },
  {
    name: 'Recurring Bills',
    href: '/bills',
  },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-4 mt-8">
      {links.map(link => (
        <li key={link.name} className="w-full">
          <Link
            href={link.href}
            className={`inline-block w-full text-white font-bold border rounded-lg px-2 py-1 border-red-200 transition-all duration-200 hover:bg-red-200 ${
              pathname === link.href ? 'text-red-400' : ''
            }`}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;
