"use client";
import { getSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Eye from "./Eye";
import HideEye from "./HideEye";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [isSelected, setIsSelected] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = await signIn("credentials", {
      redirect: false,
      firstName,
      email,
      password,
      role,
    });
    if (auth?.ok) {
      const session = await getSession();
      if (session?.user?.isNewUser) {
        redirect("/completeprofile");
      } else {
        redirect("/");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
          Sign In
        </h2>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Name"
            className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type={isSelected ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
          />
          <div
            className="absolute top-9 right-0 flex items-center pr-3"
            onClick={() => setIsSelected(!isSelected)}
          >
            {isSelected ? <Eye /> : <HideEye />}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
