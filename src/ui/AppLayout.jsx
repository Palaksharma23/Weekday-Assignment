import { Outlet } from "react-router-dom";
import React from "react";
import HeaderComp from "./HeaderComp";

function AppLayout({ jobCount, setJobCount }) {
  return (
    <div>
      <HeaderComp jobCount={jobCount} />
      <Outlet />
    </div>
  );
}

export default AppLayout;
