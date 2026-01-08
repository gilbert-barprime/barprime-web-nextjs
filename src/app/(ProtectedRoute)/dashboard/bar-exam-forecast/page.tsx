import BarExamForecastComp from "../../../../../components/BarExamForecastComp";
import { auth } from "../../../../../lib/auth";
import { customFetch } from "../../../../../lib/helper";
import { BarExamForecast } from "../../../../../types";

export default async function Page() {
  const session = await auth();

  const getBarExamForecast = async () => {
    const result = await customFetch({
      url: "/bar-exam-forecasts",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as BarExamForecast[];
  };

  const barExamForecast = await getBarExamForecast();

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Bar Exam Forecast
        </h1>
        <p className="text-gray-600">
          Access comprehensive study guides and practice materials for your bar
          exam preparation.
        </p>
      </div>

      <BarExamForecastComp list={barExamForecast} />
    </div>
  );
}
