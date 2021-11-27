import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import routes, { AppRoute } from "./routes";

function App() {
  const generateRoute = (appRoute: AppRoute, index: number) => {
    const Component = appRoute.component ?? <Outlet />;
    return (
      <Route key={index} path={appRoute.path} element={Component}>
        {(appRoute.subRoutes ?? []).map((route, i) => generateRoute(route, i))};
      </Route>
    );
  };

  return (
    <BrowserRouter>
      <Routes>{routes.map(generateRoute)}</Routes>
    </BrowserRouter>
  );
}

export default App;
