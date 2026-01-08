"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SessionWatcher() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      signOut({
        redirect: false,
      });
      setTimeout(() => {
        router.replace("/login");
      }, 10000);
    }
  }, [status, router]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 17c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Suspicious Login Detected</h1>

        <p className="text-gray-600 mb-6">
          Someone just logged in to your account from a different browser. If
          this wasn’t you, secure your account immediately.
        </p>

        <p className="text-red-600 font-semibold mb-4">
          You&apos;ll be redirected to the login page in few seconds.
        </p>
      </div>
    </div>
  );
}
