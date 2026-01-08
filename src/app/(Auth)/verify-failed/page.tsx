import Link from "next/link";
export default function VerifyFailedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 text-center">
        <h2 className="text-2xl font-bold text-error mb-4">
          ❌ Verification Failed
        </h2>
        <p className="mb-6">
          The verification link is invalid or has expired. Please request a new
          verification email to continue.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/resend-verification" className="btn btn-primary w-full">
            Resend Verification Email
          </Link>
          <Link href="/" className="btn btn-outline w-full">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
