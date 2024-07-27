import { createContext, useCallback, useEffect, useState } from "react";
import Page404 from "../Components/Page404";
import Home from "../Components/Web/Home";
import Register from "../Components/Common/Register";
import Login from "../Components/Common/Login";
import Dashboard from "../Components/Admin/Dashboard";
import UsersList from "../Components/Admin/UsersList";
import Sidebar from "../Components/Admin/Parts/Sidebar";
import PostsList from "../Components/Admin/PostsList";
import * as l from "../Constants/urls";
import UserEdit from "../Components/Admin/UserEdit";
import PostEdit from "../Components/Admin/PostEdit";
import CreatePostForm from "../Components/Forms/CreatePostForm";
import Donate from "../Components/Web/Parts/Donate";
import DonationsList from "../Components/Admin/DonationsList";
import More from "../Components/Web/More";

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
    { path: l.SITE_HOME, pc: 0, component: <Home /> },

    { path: l.SITE_REGISTER, pc: 0, component: <Register /> },
    { path: l.SITE_LOGIN, pc: 0, component: <Login /> },
    {
      path: l.SITE_DASHBOARD,
      pc: 1,
      p1: "dashboard",
      component: (
        <Sidebar>
          <Dashboard />
        </Sidebar>
      ),
    },
    {
      path: l.USERS_LIST,
      pc: 1,
      p1: "users",
      component: (
        <Sidebar>
          <UsersList />
        </Sidebar>
      ),
    },
    {
      path: l.USER_EDIT,
      pc: 2,
      p1: "user-edit",
      component: (
        <Sidebar>
          <UserEdit />
        </Sidebar>
      ),
    },
    {
      path: l.CREATE_POST,
      pc: 1,
      p1: "fundraiser",
      component: <CreatePostForm />,
    },
    {
      path: l.SITE_DONATE,
      pc: 2,
      p1: "post",
      component: <Donate />,
    },
    {
      path: l.SITE_MORE,
      pc: 2,
      p1: "post",
      component: <More />,
    },
    {
      path: l.POSTS_LIST,
      pc: 1,
      p1: "posts",
      component: (
        <Sidebar>
          <PostsList />
        </Sidebar>
      ),
    },
    {
      path: l.DONATIONS_LIST,
      pc: 1,
      p1: "donations",
      component: (
        <Sidebar>
          <DonationsList />
        </Sidebar>
      ),
    },
    {
      path: l.POST_EDIT,
      pc: 2,
      p1: "post-edit",
      component: (
        <Sidebar>
          <PostEdit />
        </Sidebar>
      ),
    },
  ];

  const findRoute = () => {
    return routes.find((r) => {
      const realPath = r.path.split("/");
      if (realPath.length === 1) {
        return realPath[0] === route && r.pc === params.length;
      }
      if (realPath.length === 2) {
        return (
          realPath[0] === route && r.pc === params.length && r.p1 === params[0]
        );
      }
      return false;
    });
  };

  const routeComponent = findRoute()?.component ?? <Page404 />;
  return (
    <RouterContext.Provider value={{ params }}>
      {routeComponent}
    </RouterContext.Provider>
  );
};

export { RouterContext, Router };
