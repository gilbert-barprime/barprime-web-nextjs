"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export default function Notifications() {
  const [formData, setFormData] = useState({
    email: true,
    push: true,
    studyReminders: true,
    examAlerts: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    if (name.startsWith("notifications.")) {
      const notificationKey = name.split(".")[1];
      setFormData({
        ...formData,
        [notificationKey]: (e.target as HTMLInputElement).checked,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Notification Settings
        </h2>
      </div>

      <div className="space-y-4">
        {Object.entries({
          email: "Email Notifications",
          push: "Push Notifications",
          studyReminders: "Study Reminders",
          examAlerts: "Exam Date Alerts",
        }).map(([key, label]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-700">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name={`notifications.${key}`}
                checked={formData[key as keyof typeof formData]}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
