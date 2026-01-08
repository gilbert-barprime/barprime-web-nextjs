import Link from "next/link";
export default function VerifySuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 text-center">
        <h2 className="text-2xl font-bold text-success mb-4">
          ✅ Account Verified!
        </h2>
        <p className="mb-6">
          Your email has been successfully verified. You can now log in and
          start using your account.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/login" className="btn btn-primary w-full">
            Go to Login
          </Link>
          <Link href="/dashboard" className="btn btn-outline w-full">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
