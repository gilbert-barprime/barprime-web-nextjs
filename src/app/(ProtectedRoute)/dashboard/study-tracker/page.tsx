import StudyTrackerComp from "../../../../../components/StudyTrackerComp";
import { auth } from "../../../../../lib/auth";
import { customFetch } from "../../../../../lib/helper";
import { StudyTracker } from "../../../../../types";

export default async function Page() {
  const session = await auth();

  const getStudyTracker = async () => {
    const result = await customFetch({
      url: "/study-tracker",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as StudyTracker[];
  };

  const data = await getStudyTracker();

  return (
    <div className="p-4 sm:p-6 max-w-full">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Study Tracker
        </h1>
        <p className="text-gray-600">Manage and track your study progress.</p>
      </div>
      <StudyTrackerComp data={data} />
    </div>
  );
}
