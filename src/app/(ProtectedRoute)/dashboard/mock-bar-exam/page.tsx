import MockBarExamComp from "../../../../../components/MockBarExamComp";
import { auth } from "../../../../../lib/auth";
import { customFetch } from "../../../../../lib/helper";
import { MockBarExam } from "../../../../../types";

export default async function Page() {
  const session = await auth();

  const getMockBarExam = async () => {
    const result = await customFetch({
      url: "/mock-bar-exams",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    return result.data as MockBarExam[] | null;
  };

  const mockBarExam = await getMockBarExam();
  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Mock Bar Exam
        </h1>
        <p className="text-gray-600">
          Access comprehensive study guides and practice materials for your bar
          exam preparation.
        </p>
      </div>

      <MockBarExamComp list={mockBarExam} />
    </div>
  );
}
