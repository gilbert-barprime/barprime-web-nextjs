import { GraduationCap } from "lucide-react";
import Link from "next/link";
import RegisterForm from "../../../../components/Forms/RegisterForm";
import SocialLoginGoogle from "../../../../components/SocialLoginGoogle";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">BarPrime</span>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Start your journey to passing the bar exam
          </p>
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <SocialLoginGoogle />
          </div>
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign in
          </Link>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
