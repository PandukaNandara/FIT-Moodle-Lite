import React, { ReactNode } from "react";
import MainLayout from "./layouts/main/MainLayout";
import LoginScreen from "./screens/login/LoginScreen";
import LogoutScreen from "./screens/logout/LogoutScreen";
import SettingsScreen from "./screens/settings/SettingsScreen";
import SignUpScreen from "./screens/signup/SignUpScreen";
import AllSubjectScreen from "./screens/subjects/AllSubjectScreen";
import OneSubjectScreen from "./screens/subjects/one/OneSubjectScreen";

interface LayoutProps {
  children: ReactNode;
}

export interface AppRoute {
  component?: JSX.Element;
  path: string;
  subRoutes?: AppRoute[];
  name?: string; // Indicating the name for the route. This can be useful when you want to display the route name as the title
}

const routes: AppRoute[] = [
  {
    component: <MainLayout />,
    path: "/*",
    subRoutes: [
      {
        component: <AllSubjectScreen />,
        path: "",
      },
      {
        component: <OneSubjectScreen />,
        path: "subjects/:id",
      },
      {
        component: <SettingsScreen />,
        path: "settings",
      },
    ],
  },
  {
    component: <LoginScreen />,
    path: "/login",
  },
  {
    component: <SignUpScreen />,
    path: "/signup",
  },

  {
    component: <LogoutScreen />,
    path: "/logout",
  },
];

export default routes;
