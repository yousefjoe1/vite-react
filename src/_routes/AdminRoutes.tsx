import { lazy } from "react";
import withSuspense from "../_components/withSuspense";
import AdminHome from "../Pages/admin/Pages/AdminHome";

// pages
// Lazy load components
const Home = lazy(() => import("../Pages/Home/Home"));


export const adminRoutes = [
      {
        index: true,
        element: withSuspense(AdminHome),
      },
    //   {
    //     path: "shop",
    //     element: withSuspense(ShopAll),
    //   }
    ]