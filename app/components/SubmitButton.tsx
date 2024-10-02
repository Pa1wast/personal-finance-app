"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel, disabled }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled}
      className="text-md w-full rounded-lg bg-grey-900 p-3 text-grey-100 hover:bg-grey-500 disabled:bg-grey-500"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
