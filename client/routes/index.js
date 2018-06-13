import Loading from "coms/Loading";
import Loadable from "react-loadable";
const routes = [
  {
    path: "/",
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () => import(/* webpackChunkName: "Home" */ "pages/Home")
    })
  },
  {
    path: "/login",
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () => import(/* webpackChunkName: "Login" */ "pages/Login")
    })
  },
  {
    path: "/reducer",
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () =>
        import(/* webpackChunkName: "ReducerDemo" */ "pages/ReducerDemo")
    })
  },
  {
    path: "/reducer/router",
    exact: true,
    component: Loadable({
      loading: Loading,
      loader: () =>
        import(/* webpackChunkName: "ReducerRouteDemo" */ "pages/ReducerRouteDemo")
    })
  }
];
export default routes;
export const privateRoutes = [
  {
    path: "/protected",
    component: Loadable({
      loading: Loading,
      loader: () =>
        import(/* webpackChunkName: "ProtectedPageDemo" */ "pages/ProtectedPageDemo")
    })
  }
];
