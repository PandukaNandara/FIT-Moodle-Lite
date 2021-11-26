import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const MainLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const isAuthenticated = false;
        if(!isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, []);

  return (
    <div>
        <div>This is app bar</div>
        <Outlet />
    </div>
  );
};

export default MainLayout;
