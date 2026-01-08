import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-8 text-center">
        <div className="text-success text-5xl mb-4">✔</div>
        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-base-content/70 mb-6">
          Thank you for your purchase. Your payment will be processed shortly.
        </p>
        <Link href="/dashboard" className="btn btn-success text-white">
          Go Back Dashboard
        </Link>
      </div>
    </div>
  );
}
