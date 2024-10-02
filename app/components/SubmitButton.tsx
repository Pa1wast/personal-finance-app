"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="text-md w-full rounded-lg bg-grey-900 p-3 text-grey-100 hover:bg-grey-500"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
