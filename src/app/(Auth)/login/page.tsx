import { redirect } from "next/navigation";
import LoginForm from "../../../../components/Forms/LoginForm";
import { auth } from "../../../../lib/auth";

export default async function Page() {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
