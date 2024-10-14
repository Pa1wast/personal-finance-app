"use client";

import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

function UserInfo() {
  const session = useSession();

  if (session.status === "loading") return <Loader />;
  const { user } = session?.data;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 rounded-full bg-black text-white md:h-24 md:w-24">
        <Image
          src="/images/logo-large.svg"
          alt="Profile Image"
          className="absolute object-fill p-2"
          fill
        />
      </div>

      <div>
        <p className="text-sm font-bold text-grey-900">Name</p>
        <p className="text-xs text-grey-900">{user.email}</p>
      </div>
    </div>
  );
}

export default UserInfo;
