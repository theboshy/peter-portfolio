import Home from "./Home.tsx";
import ErrorPage from "#components/ErrorPage";
import { createBrowserRouter, useRouteError } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
const BubbleError = () => {
  const error = useRouteError();
  if (error) {
    throw error;
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <BubbleError />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);
