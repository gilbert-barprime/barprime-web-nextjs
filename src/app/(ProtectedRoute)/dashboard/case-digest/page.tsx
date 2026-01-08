import { customFetch } from "../../../../../lib/helper";
import { CaseDigest } from "../../../../../types";
import CaseDigestComp from "../../../../../components/CaseDigestComp";
import { auth } from "../../../../../lib/auth";

export default async function Page() {
  const session = await auth();

  const getCaseDigest = async () => {
    const result = await customFetch({
      url: "/case-digests",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }
    return result.data as CaseDigest[];
  };

  const case_list = await getCaseDigest();

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Case Digest
        </h1>
        <p className="text-gray-600">
          Test your knowledge with realistic bar exam simulations and track your
          progress.
        </p>
      </div>

      <CaseDigestComp case_list={case_list} />
    </div>
  );
}
