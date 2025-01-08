"use client";

import Header from "@/app/dashboard/_components/Header";
import appStore from "@/redux/appStore";
import React from "react";
import { Provider } from "react-redux";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={appStore}>
      <div>
        <Header />
        <div className="mx-10 md:mx-36 lg:mx-60 mt-10">{children}</div>
      </div>
    </Provider>
  );
};

export default layout;
