"use client";

import { useState } from "react";

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${process.env.BASE_API_URL}/users/resend-activation-link`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (res.ok && data.status) {
        setMessage("✅ A new verification link has been sent to your email.");
      } else if (data.status === false && data.message) {
        setMessage(`❌ ${data.message}`);
      } else {
        setMessage("❌ Unable to resend. Please try again.");
      }
    } catch (err) {
      setMessage("⚠️ Something went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Resend Verification Email</h2>
        <p className="mb-6">
          Enter your email address and we’ll send you a new verification link.
        </p>
        <form onSubmit={handleResend} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`btn btn-primary w-full`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Resend Link"}
          </button>
        </form>
        {message && (
          <div className="alert alert-info mt-4">
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
