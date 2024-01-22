import * as Sentry from "@sentry/node";
Sentry.init({
  dsn: process.env.SENTRY_KEY,
  environment: process.env.NODE_ENV,
  // for use with eg console.error(err)
  integrations: [
    new CaptureConsole({
      levels: ["error", "warn", "debug"],
    }),
  ],
  tracesSampleRate: 1.0,
});

export default Sentry;
