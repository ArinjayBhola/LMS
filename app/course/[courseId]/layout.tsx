import Header from "@/app/dashboard/_components/Header";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mx-10 md:mx-36 lg:mx-60 mt-10">{children}</div>
    </div>
  );
};

export default layout;
