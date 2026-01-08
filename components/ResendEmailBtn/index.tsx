"use client";

import { useState } from "react";
import { customFetch } from "../../lib/helper";

export default function ResendEmailBtn(props: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    setIsLoading(true);
    setMessage("");

    const result = await customFetch({
      url: "/users/resend-activation-link",
      method: "POST",
      data: JSON.stringify({ email: props.email }),
    });

    if (!result) {
      setMessage("Something went wrong. Try again later.");
      setIsLoading(false);
      return;
    }

    setMessage("A new confirmation email has been sent to your inbox.");
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={handleResend}
        className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Resending..." : "Resend Confirmation Email"}
      </button>
      {message && (
        <div className="alert alert-info mt-4">
          <span>{message}</span>
        </div>
      )}
    </>
  );
}
