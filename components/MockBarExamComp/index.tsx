import { BookOpen } from "lucide-react";
import { MockBarExam } from "../../types";
import Link from "next/link";

type PropsType = {
  list: MockBarExam[] | null;
};

export default function MockBarExamComp(props: PropsType) {
  const { list } = props;
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {list &&
          list.map((ele, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105`}
            >
              <div className="p-4 sm:p-6 flex flex-col h-full">
                <div className="grow-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                          {ele.year}
                        </span>
                        {ele.mockbar_result_status && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {ele.mockbar_result_status}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {ele.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {ele.description}
                  </p>
                </div>

                <div className="flex space-x-2">
                  {ele.mockbar_result_status === "completed" ? (
                    <Link
                      href={`/dashboard/mock-bar-exam/${ele.mockBarExamResultId}/summary`}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center text-sm sm:text-base cursor-pointer"
                    >
                      Vew Result
                    </Link>
                  ) : (
                    <Link
                      href={`/dashboard/mock-bar-exam/${ele._id}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base cursor-pointer"
                    >
                      Take Exam
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {list && list.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No materials found
          </h3>
        </div>
      )}
    </>
  );
}
