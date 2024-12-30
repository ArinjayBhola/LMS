import { UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <div className="p-5 shadow-md justify-end flex">
      <UserButton />
    </div>
  );
};

export default Header;
