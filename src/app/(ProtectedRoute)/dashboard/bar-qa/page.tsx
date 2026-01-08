import BarQandAComp from "../../../../../components/BarQandA";
import { auth } from "../../../../../lib/auth";
import { customFetch } from "../../../../../lib/helper";
import { BarQandA } from "../../../../../types";

export default async function Page() {
  const session = await auth();

  const getBarQandA = async () => {
    const result = await customFetch({
      url: "/barqas",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as BarQandA[];
  };

  const list = await getBarQandA();

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Bar Q&A
        </h1>
        <p className="text-gray-600">
          Test your knowledge with realistic bar exam simulations and track your
          progress.
        </p>
      </div>
      <BarQandAComp list={list} />
    </div>
  );
}
