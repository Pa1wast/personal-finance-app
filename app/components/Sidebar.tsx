import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <div className="flex w-[25%] flex-col gap-16 rounded-br-xl rounded-tr-xl bg-grey-900">
      <Logo className="ml-4 mt-10" />
      <NavLinks />
      <button className="text-grey-300 mb-12 ml-4 mt-auto flex items-center gap-2 self-start transition-all duration-200 hover:text-grey-100">
        <ChevronDoubleLeftIcon className="size-7" />
        <span>Minimize Menu</span>
      </button>
    </div>
  );
}
