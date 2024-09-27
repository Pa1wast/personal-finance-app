import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <div className="flex w-[20%] flex-col gap-16 rounded-br-2xl rounded-tr-2xl bg-grey-900">
      <Logo className="ml-6 mt-10" />
      <NavLinks />
      <button className="mb-12 ml-6 mt-auto flex items-center gap-2 self-start text-grey-300 transition-all duration-200 hover:text-grey-100">
        <ChevronDoubleLeftIcon className="size-7" />
        <span>Minimize Menu</span>
      </button>
    </div>
  );
}
