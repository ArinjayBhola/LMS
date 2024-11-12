"use client";

import { signOut } from "next-auth/react";

const Button = () => {
  return (
    <div>
      <button
        className="flex items-center gap-2 bg-red-600 rounded-lg px-5 py-2 text-white font-semibold hover:bg-red-700"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Button;
