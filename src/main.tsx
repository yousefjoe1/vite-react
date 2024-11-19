import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyContextProvider from "./_context/conexts";

import "./index.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider } from "primereact/api";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

import VendorLayout from "./Pages/Vendor/VendorLayout";

import { homeRoutes } from "./_routes/HomeRoutes";
import NotFound from "./_components/NotFound";
import withSuspense from "./_components/withSuspense";
import MainLayout from "./_layouts/MainLayout/MainLayout";
import VendorHome from "./Pages/Vendor/VendorHome";
import { adminRoutes } from "./_routes/AdminRoutes";
import AdminLayout from "./_layouts/AdminLayout/AdminLayout";
// import ProductPage from ;

// const Vendor = lazy(() => import("./Pages/vendor/VendorLayo"));

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
    children: homeRoutes,
  },
  {
    path: "/vendor",
    element: <VendorLayout />,
    children: [
      {
        index: true,
        element: withSuspense(VendorHome),
      },
    ],
  },
  {
    path: "/admin-dach",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  {
    path: "*",
    element: withSuspense(NotFound),
  },
]);
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <MyContextProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <PrimeReactProvider>
              <RouterProvider router={router} />
            </PrimeReactProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </MyContextProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}