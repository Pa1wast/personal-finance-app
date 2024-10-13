"use client";

import { signOut, useSession } from "next-auth/react";

export default function Page() {
  async function handleClick() {
    await signOut();
  }

  return (
    <div className="flex flex-col px-4 py-6">
      My Account
      <button
        onClick={handleClick}
        className="rounded-lg bg-grey-900 px-4 py-2 text-grey-100"
      >
        Sign out
      </button>
    </div>
  );
}
