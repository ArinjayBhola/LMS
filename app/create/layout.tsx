"use client";

import React from "react";
import { Provider } from "react-redux";
import appStore from "@/redux/appStore";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={appStore}>
      <div>{children}</div>
    </Provider>
  );
};

export default Dashboard;
