import AddMoney from "../components/AddMoney";
import AddNewPot from "../components/AddNewPot";
import DeletePot from "../components/DeletePot";
import EditPot from "../components/EditPot";
import OpenModalButton from "../components/OpenModalButton";
import PotCard from "../components/PotCard";
import WithdrawMoney from "../components/WithdrawMoney";
import { getPot } from "../_lib/actions";
import { getPots } from "../_lib/data-services";

export default async function Page({ searchParams }) {
  const isAddModalOpen = searchParams.isAddModalOpen === "true";
  const isEditModalOpen = searchParams.isEditModalOpen === "true";
  const isDeleteModalOpen = searchParams.isDeleteModalOpen === "true";
  const isAddMoneyModalOpen = searchParams.isAddMoneyModalOpen === "true";
  const isWithdrawMoneyModalOpen =
    searchParams.isWithdrawMoneyModalOpen === "true";

  const potToBeChangedId = searchParams.id;
  let potToBeChanged;

  if (potToBeChangedId) potToBeChanged = await getPot(potToBeChangedId);

  const pots = await getPots();

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex justify-between">
        <h1 className="self-center text-3xl font-bold">Pots</h1>

        <OpenModalButton
          type="add"
          className="text-md rounded-lg bg-grey-900 p-3 text-grey-100 hover:bg-grey-500"
        >
          + Add New Pot
        </OpenModalButton>
      </div>

      <ul className="col-span-2 flex flex-col gap-5 py-6 lg:grid lg:grid-cols-2">
        {pots.map((pot, index) => (
          <PotCard key={pot.id} pot={pot} />
        ))}
      </ul>

      {isAddModalOpen && <AddNewPot />}
      {isEditModalOpen && <EditPot pot={potToBeChanged} />}
      {isDeleteModalOpen && <DeletePot pot={potToBeChanged} />}
      {isAddMoneyModalOpen && <AddMoney pot={potToBeChanged} />}
      {isWithdrawMoneyModalOpen && <WithdrawMoney pot={potToBeChanged} />}
    </div>
  );
}
