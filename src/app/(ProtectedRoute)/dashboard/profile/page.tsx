import { Shield } from "lucide-react";
import { achievements, studyStats } from "../../../../../data";
import { customFetch } from "../../../../../lib/helper";
import { PersonalInformation, Subscription } from "../../../../../types";
import Notifications from "../../../../../components/ProfileComp/Notifications";
import ProfileInformationCard from "../../../../../components/ProfileComp/ProfileInformationCard";
import { auth } from "../../../../../lib/auth";

export default async function Page() {
  const session = await auth();

  const getPersonalInfo = async () => {
    const result = await customFetch({
      url: "/users/profile",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }
    const data = result.data as PersonalInformation;
    return data;
  };

  const getSubscriptionDetails = async () => {
    const result = await customFetch({
      url: "/subscriptions/detail",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as Subscription;
  };
  const subscription = await getSubscriptionDetails();

  const profile = await getPersonalInfo();

  return (
    <div className="p-4 sm:p-6 max-w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Profile
        </h1>
        <p className="text-gray-600">
          Manage your account settings and track your progress.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          {/* Profile Information */}
          <ProfileInformationCard
            profile={profile}
            current_plan={subscription?.plan_name ?? "Free Plan"}
          />

          {/* Notification Settings */}
          <Notifications />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Study Statistics */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
              Study Statistics
            </h2>
            <div className="space-y-4">
              {studyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <stat.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{stat.label}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
              Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    achievement.earned ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <achievement.icon
                    className={`h-6 w-6 mt-0.5 ${
                      achievement.earned ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        achievement.earned ? "text-green-900" : "text-gray-600"
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        achievement.earned ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      {achievement.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {achievement.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Security
              </h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left text-blue-600 hover:text-blue-700 text-sm">
                Change Password
              </button>
              <button className="w-full text-left text-blue-600 hover:text-blue-700 text-sm">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left text-red-600 hover:text-red-700 text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
