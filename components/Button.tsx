"use client";

import { signOut } from "next-auth/react";

const Button = () => {
  return (
    <div>
      <button className="flex items-center gap-2" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Button;
