import React from "react";
import { createRoot } from "react-dom/client";
import "./i18n/config";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import ErrorBoundaryProvider from "./providers/ErrorBoundaryProvider";
import { initSentry } from "../sentry.io";

initSentry();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundaryProvider>
      <RouterProvider router={router} />
    </ErrorBoundaryProvider>
  </React.StrictMode>,
);
