import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

// pages
import MainLayout from "./_components/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
// import Admin from "./Pages/admin/Admin";
import Auth from "./Pages/Auth/Auth";
// import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
// import OrdersPage from "./Pages/OrdersPage/OrdersPage";
// import Checkout from "./Pages/Checkout/Checkout";
// import UserOrders from "./Pages/UserOrder/UserOrders";
// import ProductPage from "./Pages/ProductPage/ProductPage";
import MyContextProvider from "./_context/conexts";

// import { useRegisterSW } from 'virtual:pwa-register/react'
// import type { RegisterSWOptions } from 'vite-plugin-pwa/types'
//   export type { RegisterSWOptions }
// import { registerSW  } from 'virtual:pwa-register' 
// useRegisterSW({ immediate: true })

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

      // {
      //   path: "categories",
      //   element: <CategoriesPage />,
      // },
      // {
      //   path: "admin",
      //   element: <Admin />,
      // },
      {
        path: "auth",
        element: <Auth />,
      },
      // {
      //   path: "orders",
      //   element: <OrdersPage />,
      // },
      // {
      //   path: "checkout",
      //   element: <Checkout />,
      // },
      // {
      //   path: "user-order",
      //   element: <UserOrders />,
      // },
      //   {
      //   path: "product/:id",
      //   element: <ProductPage/>,
      // },
      {
        path: "*",
        element: <><img src="https://media.istockphoto.com/id/1348157796/vector/website-under-construction-page-web-page-under-construction-website-under-maintenance-page.jpg?s=612x612&w=0&k=20&c=vJCWlc0t7pZY3b41LciyKsXQAtcDlMqzq2M7zOsl5rI=" alt="" /></>, 
      },
    ],
  },
]);
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
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
} else {
  console.error('Root element not found');
}