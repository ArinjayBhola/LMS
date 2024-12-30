import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="md:w-64 hidden md:block fixed">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
