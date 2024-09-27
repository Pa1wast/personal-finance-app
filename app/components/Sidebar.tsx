import Logo from "./Logo";
import NavLinks from "./NavLinks";

export default function Sidebar() {
  return (
    <div className="h-full bg-grey-900 p-4 text-white">
      <Logo />
      <NavLinks />
      <button className="">Minimize Menu</button>
    </div>
  );
}
