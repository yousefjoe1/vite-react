import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyContextProvider from "./_context/conexts";

import "./index.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider } from 'primereact/api';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

import MainLayout from "./_components/MainLayout/MainLayout";
import MySpinner from "./_components/MainLayout/MySpinner";
import NotFound from "./_components/NotFound";

// pages
// import Admin from "./Pages/admin/Admin";
// import Home from "./Pages/Home/Home";
// import Cart from "./Pages/Cart/Cart";
// import Auth from "./Pages/Auth/Auth";
// import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
// import OrdersPage from "./Pages/OrdersPage/OrdersPage";
// import Checkout from "./Pages/Checkout/Checkout";
// import UserOrders from "./Pages/UserOrder/UserOrders";
// import ProductPage from "./Pages/ProductPage/ProductPage";
// import ContainerUp from "./_components/ContainerUp";
// Lazy load components
const Admin = lazy(() => import('./Pages/admin/Admin'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const Auth = lazy(() => import('./Pages/Auth/Auth'));
const CategoriesPage = lazy(() => import('./Pages/CategoriesPage/CategoriesPage'));
const OrdersPage = lazy(() => import('./Pages/OrdersPage/OrdersPage'));
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'));
const UserOrders = lazy(() => import('./Pages/UserOrder/UserOrders'));
const ProductPage = lazy(() => import('./Pages/ProductPage/ProductPage'));

type ComponentType<P = {}> = React.FC<P>;

const withSuspense = (Component:any) => (
  <Suspense fallback={<MySpinner />}>
    <Component />
  </Suspense>
);


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
        element: withSuspense(Home),
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
        path: "admin",
        element: withSuspense(Admin),
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
      {
        path: "*",
        element: withSuspense(NotFound),
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
          <PrimeReactProvider>
            <RouterProvider router={router} />
          </PrimeReactProvider>
          </MyContextProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}