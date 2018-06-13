import Loading from "coms/Loading";
import Loadable from "react-loadable";
const routes = [
  {
    path: "/",
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () => import("pages/Home")
    })
  },
  {
    path: "/login",
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () => import("pages/Login")
    })
  },
  {
    path: "/reducer",
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () => import("pages/ReducerDemo")
    })
  },
  {
    path: "/reducer/router",
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () => import("pages/ReducerRouteDemo")
    })
  }
];
export default routes;
export const privateRoutes = [
  {
    path: '/protected',
    component: Loadable({
      loading: Loading,
      loader: () => import("pages/ProtectedPageDemo")
    })
  }
];