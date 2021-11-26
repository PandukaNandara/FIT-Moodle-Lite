import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
        <div>This is app bar</div>
        <Outlet />
    </div>
  );
};

export default MainLayout;
