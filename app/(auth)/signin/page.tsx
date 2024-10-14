"use client";

import SubmitButton from "@/app/components/SubmitButton";
import { EyeIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  async function handleSubmit(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw res.error;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-3 md:px-8 lg:px-0">
      <div className="w-full rounded-lg bg-white px-4 py-10 lg:w-[60%]">
        <form action={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Sign In</h2>

          <div className="space-y-1">
            <label htmlFor="target" className="text-xs font-bold text-grey-500">
              Email
            </label>

            <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
              <input
                required
                type="text"
                id="email"
                name="email"
                className="h-full w-full rounded-lg px-4 py-3 outline-none placeholder:text-beige-500 disabled:opacity-75"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="target" className="text-xs font-bold text-grey-500">
              Password
            </label>

            <div className="group flex w-full items-center justify-between rounded-lg border border-beige-500 focus-within:border-grey-900 hover:border-grey-900">
              <input
                type="password"
                required
                id="password"
                name="password"
                className="h-full w-full rounded-lg px-4 py-3 outline-none placeholder:text-beige-500"
              />

              <EyeIcon className="mr-2 size-5 cursor-pointer text-grey-500 hover:text-grey-900" />
            </div>
          </div>

          <div className="mt-6">
            <SubmitButton pendingLabel={"Signing in..."} disabled={false}>
              Sign in
            </SubmitButton>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-grey-500">
          Need to create an account?{" "}
          <Link
            href="/signup"
            className="ml-2 font-bold text-grey-900 underline underline-offset-4 hover:text-grey-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
