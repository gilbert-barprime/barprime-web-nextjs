"use client";

import { useState } from "react";
import PersonalInfoForm from "../../Forms/PersonalInfoForm";
import { Camera, User } from "lucide-react";
import { PersonalInformation } from "../../../types";
import Image from "next/image";

type PropsType = {
  profile: PersonalInformation | null;
  current_plan: string;
};

export default function ProfileInformationCard(props: PropsType) {
  const { profile } = props;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Personal Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-outline btn-primary btn-sm"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Profile Photo */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
            {profile?.profile_pic ? (
              <Image
                src={profile?.profile_pic}
                width={80}
                height={80}
                alt="Profile Picture"
              ></Image>
            ) : (
              <User className="h-10 w-10 text-blue-600" />
            )}
          </div>
          {isEditing && (
            <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
              <Camera className="h-3 w-3" />
            </button>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {profile?.full_name}
          </h3>
          <p className="text-sm text-gray-600 capitalize">
            {props.current_plan}
          </p>
        </div>
      </div>

      {/* Form */}
      <PersonalInfoForm
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        data={profile}
      />
    </div>
  );
}
