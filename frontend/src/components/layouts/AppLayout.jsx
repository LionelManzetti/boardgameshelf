import { Outlet } from "react-router-dom";

import React from "react";

function DashboardLayout() {
  return (
    <div className="flex w-screen h-full  ">
      <h1>Applet</h1>
      <Outlet />
    </div>
  );
}
export default DashboardLayout;
