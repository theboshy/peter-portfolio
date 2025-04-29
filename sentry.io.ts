import * as Sentry from "@sentry/react";

export const initSentry = () =>
  Sentry.init({
    dsn: "<sentry_dns>",
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
