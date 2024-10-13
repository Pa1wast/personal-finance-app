import Image from "next/image";
import logoLarge from "../../public/images/logo-large.svg";
import Logo from "../components/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-beige-100 lg:flex-row">
      <div className="m-2 hidden max-w-[30%] flex-col rounded-lg bg-grey-900 bg-[url('/images/illustration-authentication.svg')] bg-cover bg-[center_top_47%] bg-no-repeat p-6 lg:flex">
        <Image src={logoLarge} alt="Logo" />

        <div></div>

        <h2 className="mb-6 mt-auto text-3xl font-bold text-grey-100">
          Keep track of your money and save your future
        </h2>
        <p className="text-wrap text-xs tracking-wide text-grey-100">
          Personal finance app puts you in control of your spending. Track
          transactions, set budgets, and add to savings pots easily.
        </p>
      </div>

      <div className="w-full rounded-b-xl bg-grey-900 p-6 lg:hidden">
        <Image src={logoLarge} alt="Logo" className="mx-auto block" />
      </div>

      {children}
    </div>
  );
}
