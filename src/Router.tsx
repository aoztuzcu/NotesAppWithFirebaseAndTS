import React, { Suspense, lazy, ReactElement } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "@/components/Layout";
import { ViewName } from "@/types/enums";

const Welcome: React.FC = lazy(() => import("@/views/Welcome"));
const Edit: React.FC = lazy(() => import("@/views/Edit"));
const Detail: React.FC = lazy(() => import("@/views/Detail"));
const Create: React.FC = lazy(() => import("@/views/Create"));
const NotFound: React.FC = lazy(() => import("@/views/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={<Outlet />} />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: ViewName.Create,
        element: <Create />,
      },
      {
        path: ViewName.Edit + "/:id",
        element: <Edit />,
      },
      {
        path: ViewName.Detail + "/:id",
        element: <Detail />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);

export default function Router(): ReactElement {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
