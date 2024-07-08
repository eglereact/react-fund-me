import { createContext, useCallback, useEffect, useState } from "react";
import Page404 from "../Components/Page404";
import Home from "../Components/Web/Home";
import Register from "../Components/Common/Register";
import Login from "../Components/Common/Login";

const RouterContext = createContext([]);

const Router = () => {
  const [route, setRoute] = useState("");
  const [params, setParams] = useState([]);

  const Car = () => {
    return (
      <div>
        <h1>car</h1>
        <a href="/#car/1">Fund Car</a>
        <a href="/#house/1">Fund House</a>
        <a href="/#">Home</a>
      </div>
    );
  };
  const House = () => {
    return (
      <div>
        <h1>house</h1>
        <a href="/#car/1">Fund Car</a>
        <a href="/#house/1">Fund House</a>
        <a href="/#">Home</a>
      </div>
    );
  };

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
    { path: "#car", pc: 1, component: <Car /> },
    { path: "#house", pc: 1, component: <House /> },
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
