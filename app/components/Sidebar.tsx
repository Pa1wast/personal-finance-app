import Link from 'next/link';
import Logo from './Logo';

export default function Sidebar() {
  return (
    <div className="h-full bg-black text-white p-4">
      <Logo />
      <ul className="flex flex-col gap-4 mt-8">
        <li>
          <Link href="/transactions">Overview</Link>
        </li>
        <li>
          <Link href="/transactions">Transactions</Link>
        </li>
        <li>
          <Link href="/transactions">Budgets</Link>
        </li>
        <li>
          <Link href="/transactions">Pots</Link>
        </li>
        <li>
          <Link href="/transactions">Recurring Bills</Link>
        </li>
      </ul>
      <button className="mt-auto">Minimize Menu</button>
    </div>
  );
}
