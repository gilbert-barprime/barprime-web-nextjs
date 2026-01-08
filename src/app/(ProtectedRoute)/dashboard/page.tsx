"use client";

import {
  BookOpen,
  FileText,
  Clock,
  Award,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { recentActivity, stats, upcomingTasks } from "../../../../data";
import { useSession } from "next-auth/react";
import ComingSoon from "../../../../components/ComingSoon";
import { useEffect } from "react";

interface HubSpotWindow extends Window {
  _hsq?: unknown[][];
}

export default function Page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (typeof window !== "undefined") {
        // Initialize or get the HubSpot tracking queue
        const _window = (
          typeof window !== "undefined" ? window : {}
        ) as HubSpotWindow;
        const _hsq = (_window._hsq = _window._hsq || []);
        // 1. Identify the user by email
        _hsq.push(["identify", { email: session.user.email }]);

        // // 2. You MUST track a page view immediately after identify for the update to sync
        // _hsq.push(["setPath", pathname]);
        // _hsq.push(["trackPageView"]);
      }
    }
  }, [status, session?.user.email]);

  return <ComingSoon />;

  return (
    <div className="p-4 sm:p-6 max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session?.user.name}!
        </h1>
        <p className="text-gray-600">
          Continue your bar exam preparation journey. You&apos;re doing great!
        </p>
      </div>

      {/* Subscription Alert */}
      {/* {session?.user?.subscription.type === "free" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-medium text-yellow-800">
                  Upgrade to unlock full features
                </h3>
                <p className="text-sm text-yellow-700">
                  Get access to unlimited practice exams and expert tutoring
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/plan"
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      )} */}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Recent Activity
              </h2>
              <Link
                href="/dashboard/examination"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm sm:text-base"
              >
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === "exam"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }`}
                    >
                      {activity.type === "exam" ? (
                        <FileText
                          className={`h-5 w-5 ${
                            activity.type === "exam"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        />
                      ) : (
                        <BookOpen className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {activity.score || activity.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Upcoming Tasks
              </h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {task.due}
                    </p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          {/* <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h2>

            <div className="space-y-3">
              <Link
                href="/dashboard/examination"
                className={`flex items-center justify-between p-3 rounded-lg border-2 border-dashed transition-colors text-sm sm:text-base ${
                  user?.subscription.type === "free"
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-blue-200 text-blue-600 hover:bg-blue-50"
                }`}
                // onClick={(e) =>
                //   user?.subscription.type === "free" && e.preventDefault()
                // }
              >
                <span>Start Practice Exam</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/dashboard/reviewers"
                className={`flex items-center justify-between p-3 rounded-lg border-2 border-dashed transition-colors text-sm sm:text-base ${
                  user?.subscription.type === "free"
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-green-200 text-green-600 hover:bg-green-50"
                }`}
                // onClick={(e) =>
                //   user?.subscription.type === "free" && e.preventDefault()
                // }
              >
                <span>Study Materials</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/dashboard/profile"
                className="flex items-center justify-between p-3 rounded-lg border-2 border-dashed border-purple-200 text-purple-600 hover:bg-purple-50 transition-colors text-sm sm:text-base"
              >
                <span>Update Profile</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
