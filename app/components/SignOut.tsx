"use client";

import { signOut } from "next-auth/react";

function SignOut() {
  async function handleClick() {
    await signOut();
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-grey-900 px-4 py-2 text-grey-100"
    >
      Sign Out
    </button>
  );
}

export default SignOut;
