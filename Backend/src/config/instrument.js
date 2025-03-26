// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://2fe748b2f206bacac80243e9bddc9cbb@o4509027655352320.ingest.us.sentry.io/4509043197280256",

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});