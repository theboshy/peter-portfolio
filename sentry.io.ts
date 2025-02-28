import * as Sentry from "@sentry/react";

export const initSentry = () =>
  Sentry.init({
    dsn: "https://5763a46a4251a6fdcd5515157ed50e78@o4508792289624064.ingest.us.sentry.io/4508792290672640",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
