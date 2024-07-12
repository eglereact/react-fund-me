import { createContext, useCallback, useEffect, useState } from "react";
import Page404 from "../Components/Page404";
import Home from "../Components/Web/Home";
import Register from "../Components/Common/Register";
import Login from "../Components/Common/Login";
import Dashboard from "../Components/Admin/Dashboard";

const RouterContext = createContext([]);

const Router = () => {
  const [route, setRoute] = useState("");
  const [params, setParams] = useState([]);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.split("/");
    hash[0] || (hash[0] = "#");
    setRoute(hash.shift());
    setParams(hash);
  }, [setRoute, setParams]);

  useEffect(() => {
    const hash = window.location.hash.split("/");
    hash[0] || (hash[0] = "#");
    setRoute(hash.shift());
    setParams(hash);

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [handleHashChange]);

  const routes = [
    { path: "", pc: 0, component: null },
    { path: "#", pc: 0, component: <Home /> },
    { path: "#dashboard", pc: 0, component: <Dashboard /> },
    { path: "#register", pc: 0, component: <Register /> },
    { path: "#login", pc: 0, component: <Login /> },
  ];

  const routeComponent = routes.find(
    (r) => r.path === route && r.pc === params.length
  )?.component ?? <Page404 />;

  return (
    <RouterContext.Provider value={params}>
      {routeComponent}
    </RouterContext.Provider>
  );
};

export { RouterContext, Router };
