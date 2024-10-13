import { convertToCurrency } from "../_lib/helpers";
import ModalActions from "./ModalActions";
import OpenModalButton from "./OpenModalButton";

export default async function PotCard({ pot }) {
  const { name, total, target, theme, id } = pot;

  const barPercentage = (total / target) * 100;
  const barWidth = barPercentage.toString().concat("%");

  return (
    <li className="relative space-y-4 rounded-lg bg-white p-4">
      <div className="flex items-center gap-4">
        <div
          style={{ backgroundColor: theme }}
          className="h-5 w-5 rounded-full"
        ></div>
        <h2 className="mr-auto text-2xl font-semibold capitalize">{name}</h2>

        <ModalActions buttonLabel="Pot" id={id} />
      </div>

      <div className="flex justify-between">
        <p className="text-sm text-grey-500">Total Saved</p>
        <p className="text-2xl font-bold">{convertToCurrency(total, 2)}</p>
      </div>

      <div className="w-full">
        <div className="h-2 w-full overflow-hidden rounded-lg bg-beige-100">
          <div
            className="z-10 h-full rounded-lg bg-green"
            style={{ width: barWidth, backgroundColor: theme }}
          ></div>
        </div>

        <div className="flex justify-between">
          <p className="mt-2 text-xs font-bold text-grey-500">
            {barPercentage.toFixed(2).concat("%")}
          </p>
          <p className="mt-2 text-xs text-grey-500">
            Target of {convertToCurrency(target, 2)}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-3">
        <OpenModalButton
          type="add-money"
          className="flex-1 rounded-lg border border-beige-100 bg-beige-100 px-6 py-3 font-semibold text-grey-900 hover:border-grey-500 hover:bg-white"
          id={id}
        >
          + Add Money
        </OpenModalButton>
        <OpenModalButton
          type="withdraw-money"
          className="flex-1 rounded-lg border border-beige-100 bg-beige-100 px-6 py-3 font-semibold text-grey-900 hover:border-grey-500 hover:bg-white"
          id={id}
        >
          Withdraw
        </OpenModalButton>
      </div>
    </li>
  );
}
