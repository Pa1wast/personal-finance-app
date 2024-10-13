"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Sidebar from "./Sidebar";

export function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
