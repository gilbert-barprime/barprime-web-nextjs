"use client";

import { useState } from "react";
import { practiceExams, user } from "../../../../../data";
import {
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  FileText,
  Lock,
  Play,
  TrendingUp,
  Users,
} from "lucide-react";
import ComingSoon from "../../../../../components/ComingSoon";

export default function Page() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredExams = practiceExams.filter((exam) => {
    return (
      selectedDifficulty === "all" || exam.difficulty === selectedDifficulty
    );
  });

  const canAccess = (exam: { premium: boolean }) => {
    return !exam.premium || user?.subscription.type !== "free";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return <ComingSoon />;

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Practice Examinations
        </h1>
        <p className="text-gray-600">
          Test your knowledge with realistic bar exam simulations and track your
          progress.
        </p>
      </div>

      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs sm:text-sm text-gray-600">
                Completed Exams
              </p>
            </div>
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">78%</p>
              <p className="text-xs sm:text-sm text-gray-600">Average Score</p>
            </div>
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                24.5h
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Study Time</p>
            </div>
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                Top 15%
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Ranking</p>
            </div>
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Available Exams
          </h2>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
              !canAccess(exam) ? "opacity-75" : ""
            }`}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(
                        exam.difficulty
                      )}`}
                    >
                      {exam.difficulty}
                    </span>
                    {exam.premium && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                        Premium
                      </span>
                    )}
                    {exam.completed && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {exam.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {exam.subject}
                  </p>
                </div>
                {!canAccess(exam) && <Lock className="h-5 w-5 text-gray-400" />}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  {exam.questions} questions
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {exam.duration} min
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {exam.participants.toLocaleString()} taken
                </div>
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {exam.avgScore}% avg
                </div>
              </div>

              {exam.completed && exam.lastScore && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Your last score:
                    </span>
                    <span
                      className={`font-semibold ${getScoreColor(
                        exam.lastScore
                      )}`}
                    >
                      {exam.lastScore}%
                    </span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {canAccess(exam) ? (
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base">
                    <Play className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">
                      {exam.completed ? "Retake" : "Start Exam"}
                    </span>
                    <span className="sm:hidden">
                      {exam.completed ? "Retake" : "Start"}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => (window.location.href = "/dashboard/plan")}
                    className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors text-sm sm:text-base"
                  >
                    <span className="hidden sm:inline">Upgrade to Access</span>
                    <span className="sm:hidden">Upgrade</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
          Performance Insights
        </h2>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">
              Subject Performance
            </h3>
            <div className="space-y-3">
              {[
                {
                  subject: "Constitutional Law",
                  score: 85,
                  color: "bg-green-500",
                },
                { subject: "Contracts", score: 78, color: "bg-blue-500" },
                { subject: "Torts", score: 72, color: "bg-yellow-500" },
                { subject: "Criminal Law", score: 89, color: "bg-green-500" },
                { subject: "Evidence", score: 65, color: "bg-red-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.subject}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {item.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">
              Study Recommendations
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-800">
                  Focus Area: Evidence
                </p>
                <p className="text-xs text-red-600">
                  Your lowest performing subject - 65% average
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">
                  Improvement: Torts
                </p>
                <p className="text-xs text-yellow-600">
                  Room for improvement - practice more complex scenarios
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  Strength: Criminal Law
                </p>
                <p className="text-xs text-green-600">
                  Excellent performance - maintain this level
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
