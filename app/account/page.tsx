import SignOut from "../components/SignOut";
import UserInfo from "../components/UserInfo";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Account</h1>

      <div className="flex flex-col rounded-lg bg-white p-4 md:p-10">
        <UserInfo />
      </div>

      <div className="flex flex-col gap-6 rounded-lg bg-white p-4 sm:flex-row md:p-10">
        <div className="gap-4 space-y-1">
          <label htmlFor="target" className="text-grey-900">
            Balance
          </label>

          <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
            <input
              required
              type="number"
              id="balance"
              name="balance"
              className="h-full w-full rounded-lg px-3 py-2 outline-none placeholder:text-beige-500 disabled:opacity-75"
            />
          </div>
        </div>

        <div className="gap-4 space-y-1">
          <label htmlFor="target" className="text-grey-900">
            Income
          </label>

          <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
            <input
              required
              type="number"
              id="income"
              name="income"
              className="h-full w-full rounded-lg px-3 py-2 outline-none placeholder:text-beige-500 disabled:opacity-75"
            />
          </div>
        </div>

        <div className="gap-4 space-y-1">
          <label htmlFor="target" className="text-grey-900">
            Expenses
          </label>

          <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
            <input
              required
              type="number"
              id="expenses"
              name="expenses"
              className="h-full w-full rounded-lg px-3 py-2 outline-none placeholder:text-beige-500 disabled:opacity-75"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <SignOut />

        <button className="rounded-lg bg-red px-4 py-2 text-grey-100">
          Delete Account
        </button>
      </div>
    </div>
  );
}
