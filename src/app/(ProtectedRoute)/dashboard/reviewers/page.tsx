import ReviewersComp from "../../../../../components/ReviewersComp";
import { auth } from "../../../../../lib/auth";
import { customFetch } from "../../../../../lib/helper";
import { Reviewer } from "../../../../../types";

export default async function Page() {
  const session = await auth();

  const getReviewers = async () => {
    const result = await customFetch({
      url: "/reviewers",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as Reviewer[];
  };

  const reviewers = await getReviewers();

  // return <ComingSoon />;

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Study Materials
        </h1>
        <p className="text-gray-600">
          Access comprehensive study guides and practice materials for your bar
          exam preparation.
        </p>
      </div>

      <ReviewersComp reviewers={reviewers} />
    </div>
  );
}
