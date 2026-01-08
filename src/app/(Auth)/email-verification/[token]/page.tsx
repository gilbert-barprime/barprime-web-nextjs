import { redirect } from "next/navigation";
import { customFetch } from "../../../../../lib/helper";

interface VerifyPageProps {
  params: Promise<{ token: string }>;
}

export default async function Page({ params }: VerifyPageProps) {
  const { token } = await params;

  const validateToken = async (token: string) => {
    try {
      // Call your backend API to verify the token
      const result = await customFetch({
        url: `/users/activate-account/${token}`,
        method: "GET",
      });

      if (result.status) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  if (await validateToken(token)) {
    return redirect("/verify-success");
  } else {
    return redirect("/verify-failed");
  }

  return null;
}
