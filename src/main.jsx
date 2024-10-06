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
        path: "orders-page",
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
