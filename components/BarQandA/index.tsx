import { BookOpen, Eye, Timer } from "lucide-react";
import { BarQandA } from "../../types";
import Link from "next/link";

type PropsType = {
  list: BarQandA[] | null;
};

export default function BarQandAComp(props: PropsType) {
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
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {ele.year}
                      </span>
                      {/* {material.premium && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </span>
                    )} */}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {ele.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{ele.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {ele.pages} pages
                  </span>
                  <span className="flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    {ele.reading_time}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/bar-qa/viewer/${ele._id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base cursor-pointer"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                  {/* <button className="bg-gray-100 text-gray-700 py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="h-4 w-4" />
                </button> */}
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
