"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel, disabled, type = "regular" }) {
  const { pending } = useFormStatus();

  let className = "text-md w-full rounded-lg p-3";

  if (type === "regular")
    className +=
      " bg-grey-900 text-grey-100 hover:bg-grey-500 disabled:bg-grey-500";

  if (type === "delete") className += " bg-red text-grey-100 hover:opacity-75 ";

  return (
    <button type="submit" disabled={disabled} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
