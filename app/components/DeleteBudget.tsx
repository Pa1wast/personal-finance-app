"use client";

import { useSearchParams, useRouter } from "next/navigation";
import CloseModalButton from "./CloseModalButton";
import { deleteBudget } from "../_lib/actions";
import { toast } from "react-toastify";
import SubmitButton from "./SubmitButton";

function DeleteBudget({ budget }) {
  const { id, category } = budget;
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleCloseModal() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("isDeleteModalOpen");
    params.delete("id");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  async function handleDelete() {
    try {
      await deleteBudget(id);
      handleCloseModal();
      toast.success("Budget was successfully deleted");
    } catch (error) {
      toast.error("Could not delete budget");
      console.error(error);
    }
  }
  return (
    <>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-50"></div>

      <div className="absolute left-[50%] top-[50%] z-20 w-[95%] translate-x-[-50%] translate-y-[-50%] space-y-10 rounded-lg bg-white px-7 py-5 md:w-[75%] lg:w-[50vw]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Delete ‘{category}’?</h2>
          <CloseModalButton onCloseModal={handleCloseModal} />
        </div>

        <p>
          Are you sure you want to delete this budget? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>

        <div className="space-y-2">
          <form action={handleDelete}>
            <SubmitButton pendingLabel="Deleting..." type="delete">
              Yes, Confirm Deletion
            </SubmitButton>
          </form>
          <button
            className="text-md w-full rounded-lg p-3 hover:bg-grey-100"
            onClick={handleCloseModal}
          >
            No, Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteBudget;
