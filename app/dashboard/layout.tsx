"use client";

import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import { Provider } from "react-redux";
import appStore from "@/redux/appStore";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={appStore}>
      <div>
        <div className="md:w-64 hidden md:block fixed">
          <SideBar />
        </div>
        <div className="md:ml-64">
          <Header />
          <div className="p-10">{children}</div>
        </div>
      </div>
    </Provider>
  );
};

export default Dashboard;
