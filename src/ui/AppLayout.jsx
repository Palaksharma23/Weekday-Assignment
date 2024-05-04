import { Outlet } from "react-router-dom";
import React from "react";
import HeaderComp from "./HeaderComp";

function AppLayout() {
  return (
    <div>
      <HeaderComp></HeaderComp>
      <Outlet />
    </div>
  );
}

export default AppLayout;
