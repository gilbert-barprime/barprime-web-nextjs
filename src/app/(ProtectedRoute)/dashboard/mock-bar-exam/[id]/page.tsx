import MockBarForm from "../../../../../../components/Forms/MockBarForm";
import { auth } from "../../../../../../lib/auth";
import { customFetch } from "../../../../../../lib/helper";
import { MockExamDetail } from "../../../../../../types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const session = await auth();

  const getMockBarExamById = async () => {
    const result = await customFetch({
      url: `/mock-bar-exams/${id}`,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    return result.data as MockExamDetail | null;
  };

  const mockBarExam = await getMockBarExamById();
  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Mock Bar Exam
        </h1>
        <div className="text-lg">
          <span className="font-medium">Subject:</span> {mockBarExam?.name}
        </div>
        <div className="mb-2">
          <span className="font-medium">Description:</span>{" "}
          {mockBarExam?.description}
        </div>
        <div>
          <span className="font-medium">Duration: </span>
          {mockBarExam?.time_limit} minutes
        </div>
      </div>
      <MockBarForm mockBarExam={mockBarExam} />
    </div>
  );
}
