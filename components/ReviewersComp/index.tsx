"use client";

import { useState } from "react";
import {
  BookOpen,
  Clock,
  Download,
  Eye,
  Filter,
  Star,
  Timer,
} from "lucide-react";
import { Reviewer } from "../../types";
import Link from "next/link";

type PropsType = {
  reviewers: Reviewer[] | null;
};

export default function ReviewersComp(props: PropsType) {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedSubject, setSelectedSubject] = useState("all");
  const [reviewers, setReviewers] = useState<Reviewer[] | null>(
    props.reviewers
  );
  // const filteredMaterials = reviewMaterials.filter((material) => {
  //   const matchesSearch =
  //     material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     material.subject.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesSubject =
  //     selectedSubject === "all" || material.subject === selectedSubject;
  //   return matchesSearch && matchesSubject;
  // });

  // const canAccess = (material: { premium: boolean }) => {
  //   return !material.premium || user?.subscription.type !== "free";
  // };

  return (
    <>
      {/* <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <ReviewerFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
          />
        </div>
      </div> */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reviewers &&
          reviewers.map((material) => (
            <div
              key={material._id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 `}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {/* <div className="flex items-center space-x-2 mb-2">
                       <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        Reviewer Type
                      </span> 
                       {material.premium && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </span>
                      )} 
                    </div> */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {material.name}
                    </h3>
                    {/* <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      {material.subjectId}
                    </p> */}
                  </div>
                  {/* {!canAccess(material) && (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )} */}
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {material.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {material.pages} pages
                  </span>
                  <span className="flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    {material.reading_time}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/reviewers/viewer/${material._id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base cursor-pointer"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                  {/* <button className="bg-gray-100 text-gray-700 py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    <Download className="h-4 w-4" />
                  </button> */}
                </div>
              </div>
            </div>
          ))}
      </div>

      {reviewers && reviewers.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No materials found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mt-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Study Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p>
              Set aside dedicated study time each day for consistent progress.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p>Focus on understanding concepts rather than memorizing facts.</p>
          </div>
          <div className="flex items-start space-x-2">
            <Star className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p>Take practice tests regularly to identify knowledge gaps.</p>
          </div>
          <div className="flex items-start space-x-2">
            <Filter className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p>Review and analyze your incorrect answers to improve.</p>
          </div>
        </div>
      </div>
    </>
  );
}
