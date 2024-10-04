import { ChevronUpIcon } from "lucide-react";
import { updateBudget } from "../lib/actions";
import { toast } from "react-toastify";

function EditBudgetForm({ onCloseModal }) {
  async function handleSubmit(formData) {
    if (!formData) return;
    try {
      await updateBudget(formData);
      onCloseModal();
      toast.success("Budget was successfully edited");
    } catch (error) {
      toast.error("Could not add budget");
      console.error(error);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input hidden value={id} name="budgetId" />
      <div className="space-y-1">
        <label htmlFor="category" className="text-xs font-bold text-grey-500">
          Budget Category
        </label>

        <div
          onClick={() => setIsCategoryOpen((cur) => !cur)}
          className="relative flex items-center justify-between overflow-hidden rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900"
        >
          <span className="pointer-events-none absolute right-0 top-[50%] flex aspect-square h-full w-8 translate-y-[-50%] items-center bg-white">
            {isCategoryOpen ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronDownIcon className="size-4" />
            )}
          </span>
          <select
            required
            defaultValue={category}
            onChange={() => setIsChangesMade(true)}
            id="category"
            name="category"
            className="focus-visible::outline-none w-full px-4 py-3 focus:outline-none active:outline-none"
          >
            <option value="general">General</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="maximum-amount"
          className="text-xs font-bold text-grey-500"
        >
          Maximum Spend
        </label>
        <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
          <DollarSign className="ml-4 size-5 cursor-pointer text-grey-500 group-hover:text-grey-900" />

          <input
            defaultValue={maximum}
            required
            onChange={() => setIsChangesMade(true)}
            type="text"
            id="maximum-amount"
            name="maximum-amount"
            className="h-full w-full rounded-lg px-4 py-3 outline-none placeholder:text-beige-500"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="theme" className="text-xs font-bold text-grey-500">
          Theme
        </label>

        <div
          onClick={() => setIsThemeOpen((cur) => !cur)}
          className="relative flex items-center justify-between overflow-hidden rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900"
        >
          <span className="pointer-events-none absolute right-0 top-[50%] flex aspect-square h-full w-8 translate-y-[-50%] items-center bg-white">
            {isThemeOpen ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronDownIcon className="size-4" />
            )}
          </span>

          <select
            defaultValue={theme}
            onChange={() => setIsChangesMade(true)}
            required
            id="theme"
            name="theme"
            className="focus-visible::outline-none w-full px-4 py-3 focus:outline-none active:outline-none"
          >
            <option value="#277C78">Green</option>
            <option value="#597C7C">Turquoise</option>
            <option value="#7F9161">Army Green</option>
            <option value="#F2CDAC">Yellow</option>
            <option value="#CAB361">Gold</option>
            <option value="#BE6C49">Orange</option>
            <option value="#C94736">Red</option>
            <option value="#934F6F">Magenta</option>
            <option value="#82C9D7">Cyan</option>
            <option value="#3F82B2">Blue</option>
            <option value="#626070">Navy</option>
            <option value="#97A0AC">Navy Gray</option>
            <option value="#826CB0">Dark Purple</option>
            <option value="#AF81BA">Light Purple</option>
            <option value="#93674F">Brown</option>
          </select>
        </div>
      </div>
      <SubmitButton pendingLabel="Saving..." disabled={!changesMade}>
        Save Changes
      </SubmitButton>
    </form>
  );
}

export default EditBudgetForm;
