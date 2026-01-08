import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">
          🎉 Registration Successful!
        </h2>
        <p className="mb-6">
          Thank you for signing up. We’ve sent a confirmation link to your
          email. Please check your inbox to verify your account.
        </p>

        <p className="italic text-gray-400">
          If you don&apos;t see the email, please check your spam folder.
        </p>
        <p className=" text-gray-400">
          Didn&apos;t receive the email?{" "}
          <Link
            href="/resend-verification"
            className="text-blue-600 hover:underline"
          >
            Resend Verification Email
          </Link>
        </p>
      </div>
    </div>
  );
}
