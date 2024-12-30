import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import CourseList from "./_components/CourseList";

const Dashboard = () => {
  return (
    <div>
      <WelcomeBanner />
      <CourseList />
    </div>
  );
};

export default Dashboard;
