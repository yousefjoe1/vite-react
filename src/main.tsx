import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyContextProvider from "./_context/conexts";

import "./index.css";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider } from "primereact/api";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

import MainLayout from "./_components/MainLayout/MainLayout";
import NotFound from "./_components/NotFound";
import AdminLayout from "./Pages/admin/AdminLayout";
import { homeRoutes } from "./_routes/HomeRoutes";
import withSuspense from "./_components/WithSuspense";

// pages
// Lazy load components
const Admin = lazy(() => import("./Pages/admin/Admin"));

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
    children: homeRoutes
  },
  {
    path: "/admin",
    element: withSuspense(AdminLayout),
    children: [
      {
        index: true,
        element: withSuspense(Admin),
      },
    ],
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
  console.error("Root element not found");
}
