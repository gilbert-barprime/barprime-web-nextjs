"use client";

import { signIn } from "next-auth/react";

export default function SocialLoginGoogle() {
  return (
    <button
      className="btn"
      onClick={() => {
        signIn("google", {
          redirectTo: `/dashboard`,
          redirect: true,
        });
      }}
    >
      <span>Google</span>
    </button>
  );
}
