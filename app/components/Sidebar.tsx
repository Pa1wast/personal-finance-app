import Logo from './Logo';
import NavLinks from './NavLinks';

export default function Sidebar() {
  return (
    <div className="h-full bg-black text-white p-4">
      <Logo />
      <NavLinks />
      <button className="mt-auto">Minimize Menu</button>
    </div>
  );
}
