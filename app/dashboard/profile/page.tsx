"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/appStore";

const ProfilePage = () => {
  const { email, name, isMember } = useSelector((state: RootState) => {
    const result = state?.userData?.data?.result;
    return result ? result : { email: "", name: "", isMember: false };
  });
  const totalCourses = useSelector((state: RootState) => state?.courseData?.data);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">{name}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-medium">Username:</span> {name}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-medium">Email:</span> {email}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-medium">Premium Member:</span> {isMember ? "Yes" : "No"}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-medium">Total Courses:</span> {totalCourses.length}
        </p>
        <Link href="/create">
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Create a Course
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
