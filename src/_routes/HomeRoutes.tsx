import { lazy } from "react";
import withSuspense from "../_components/withSuspense";

// pages
// Lazy load components
const Admin = lazy(() => import("../Pages/admin/VendorHome"));
const Home = lazy(() => import("../Pages/Home/Home"));
const Cart = lazy(() => import("../Pages/Cart/Cart"));
const Auth = lazy(() => import("../Pages/Auth/Auth"));
const CategoriesPage = lazy(
  () => import("../Pages/CategoriesPage/CategoriesPage")
);
const OrdersPage = lazy(() => import("../Pages/OrdersPage/OrdersPage"));
const Checkout = lazy(() => import("../Pages/Checkout/Checkout"));
const UserOrders = lazy(() => import("../Pages/UserOrder/UserOrders"));
const ProductPage = lazy(() => import("../Pages/ProductPage/ProductPage"));
const ShopAll = lazy(() => import("../Pages/ShopAll/ShopAll"));

export const homeRoutes = [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "shop",
        element: withSuspense(ShopAll),
      },
      {
        path: "cart",
        element: withSuspense(Cart),
      },
      {
        path: "categories",
        element: withSuspense(CategoriesPage),
      },
      {
        path: "auth",
        element: withSuspense(Auth),
      },
      {
        path: "orders",
        element: withSuspense(OrdersPage),
      },
      {
        path: "checkout",
        element: withSuspense(Checkout),
      },
      {
        path: "user-order",
        element: withSuspense(UserOrders),
      },
      {
        path: "product/:id",
        element: withSuspense(ProductPage),
      },

    ]