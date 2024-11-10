"use client";
import { createStudentCred } from "@/lib/actions/createStudentCred";
import { createTeacherCred } from "@/lib/actions/createTeacherCred";
import { SessionProps } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfileForm = ({ session }: { session: SessionProps }) => {
  const [dob, setDob] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [studentPhoneNo, setStudentPhoneNo] = useState("");
  const [bio, setBio] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [teacherPhoneNo, setTeacherPhoneNo] = useState("");
  const [specialization, setSpecialization] = useState("");
  const router = useRouter();

  const submitForm = async () => {
    try {
      if (session.user.role === "Student") {
        await createStudentCred({
          dob,
          highestQualification,
          studentPhoneNo,
          session,
        });
        router.push("/");
      }
      if (session.user.role === "Teacher") {
        await createTeacherCred({
          specialization,
          teacherPhoneNo,
          joiningDate,
          bio,
          session,
        });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex p-8">
      <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-semibold mb-6">
          Complete your Profile({session.user.role})
        </h2>
        {session.user.role === "Student" ? (
          <div className="flex flex-col w-1/2 space-y-4">
            <label className="text-gray-700 font-medium">
              Date of Birth
              <input
                placeholder="Date of birth"
                className="border border-gray-300 rounded-md p-3 mt-1 w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setDob(e.target.value)}
              />
            </label>
            <label className="text-gray-700 font-medium">
              Highest Qualification
              <input
                placeholder="Highest Qualification"
                className="border border-gray-300 rounded-md p-3 mt-1 w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setHighestQualification(e.target.value)}
              />
            </label>
            <label className="text-gray-700 font-medium">
              Phone Number
              <input
                placeholder="Phone Number"
                className="border border-gray-300 rounded-md p-3 mt-1 w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setStudentPhoneNo(e.target.value)}
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-col w-1/2 space-y-4">
            <label className="text-gray-700 font-medium">
              Bio
              <input
                placeholder="Bio"
                className="border border-gray-300 rounded-md p-3 mt-1 w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setBio(e.target.value)}
              />
            </label>
            <label className="text-gray-700 font-medium">
              Joining Date
              <input
                placeholder="Joining Date"
                className="border border-gray-300 rounded-md p-3 mt-1 w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </label>
            <label className="text-gray-700 font-medium">
              Phone Number
              <input
                placeholder="Phone Number"
                className="border border-gray-300 rounded-md p-3 mt-1 w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setTeacherPhoneNo(e.target.value)}
              />
            </label>
            <label className="text-gray-700 font-medium">
              Specialization
              <input
                placeholder="Specialization"
                className="border border-gray-300 rounded-md p-3 mt-1 w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </label>
          </div>
        )}
        <button
          onClick={submitForm}
          className="text-white font-semibold rounded-md p-3 mt-1 w-1/2  bg-blue-500 hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <Image
          src={"/assets/image.png"}
          className="rounded-lg m-10"
          width={1000}
          height={1000}
          alt={"Profile Image"}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
