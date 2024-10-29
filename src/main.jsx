import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

// pages
import MainLayout from "./_components/MainLayout/MainLayout.jsx";
import Home from "./Pages/Home/Home.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Admin from "./Pages/admin/Admin.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage.jsx";
import OrdersPage from "./Pages/OrdersPage/OrdersPage.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import UserOrders from "./Pages/UserOrder/UserOrders.jsx";
import ProductPage from "./Pages/ProductPage/ProductPage.jsx";
import MyContextProvider from "./_context/conexts.jsx";

import { registerSW } from 'virtual:pwa-register'


registerSW({ immediate: true })

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "user-order",
        element: <UserOrders />,
      },
        {
        path: "product/:id",
        element: <ProductPage/>,
      },
      {
        path: "*",
        element: <><img src="https://media.istockphoto.com/id/1348157796/vector/website-under-construction-page-web-page-under-construction-website-under-maintenance-page.jpg?s=612x612&w=0&k=20&c=vJCWlc0t7pZY3b41LciyKsXQAtcDlMqzq2M7zOsl5rI=" alt="" /></>, 
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <MyContextProvider>
        <RouterProvider router={router} />
        </MyContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
