import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <div className="flex w-[18%] min-w-max flex-col gap-16 rounded-br-2xl rounded-tr-2xl bg-grey-900">
      <Logo className="ml-3 mt-6" />
      <NavLinks />
      <button className="mb-8 ml-3 mt-auto flex items-center gap-2 self-start text-grey-300 transition-all duration-200 hover:text-grey-100">
        <ChevronDoubleLeftIcon className="size-4" />
        <span>Minimize Menu</span>
      </button>
    </div>
  );
}
