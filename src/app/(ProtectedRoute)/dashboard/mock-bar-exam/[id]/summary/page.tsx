import { auth } from "../../../../../../../lib/auth";
import { customFetch } from "../../../../../../../lib/helper";
import { MockBarResult } from "../../../../../../../types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const session = await auth();

  const getMockBarExamResult = async () => {
    const result = await customFetch({
      url: `/mock-bar-results/${id}`,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    return result.data as MockBarResult;
  };
  const data = await getMockBarExamResult();

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Mock Bar Exam Summary
        </h1>
        {/* <div className="text-lg">
          <span className="font-medium">Subject:</span> {mockBarExam?.name} -{" "}
          {data?.year}
        </div>
        <div className="mb-2">
          <span className="font-medium">Description:</span>{" "}
          {data?.description}
        </div>
        <div>
          <span className="font-medium">Duration: </span>
          {mockBarExam?.time_limit} minutes
        </div> */}
        <div className=""></div>
      </div>
      <div className="grid gap-4">
        {data?.items.map((ele, index) => (
          <div className="bg-white rounded shadow p-4" key={index}>
            <div className="text-lg font-medium">Question {index + 1}:</div>
            <p>{ele.question}</p>
            <br />
            <div className="text-lg font-medium">Answer:</div>
            <textarea
              rows={8}
              required
              readOnly
              value={ele.answer}
              className="w-full border border-gray-300 rounded p-2 outline-none"
            ></textarea>
          </div>
        ))}
      </div>
    </div>
  );
}
