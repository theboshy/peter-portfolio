import Home from "./Home.tsx";
import ErrorPage from "#components/ErrorPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);
