import LastMinuteTipsComp from "../../../../../components/LastMinuteTipsComp";
import { auth } from "../../../../../lib/auth";
import { customFetch } from "../../../../../lib/helper";
import { LastMinuteTips } from "../../../../../types";

export default async function Page() {
  const session = await auth();

  const getLastMinuteTips = async () => {
    const result = await customFetch({
      url: "/last-minute-tips",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as LastMinuteTips[];
  };

  const lastMinuteTips = await getLastMinuteTips();

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Last Minute Tips
        </h1>
        <p className="text-gray-600">
          Access comprehensive study guides and practice materials for your bar
          exam preparation.
        </p>
      </div>

      <LastMinuteTipsComp list={lastMinuteTips} />
    </div>
  );
}
