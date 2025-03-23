// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://4afd8bda25a4dbc763dea6a546300a9e@o4509027655352320.ingest.us.sentry.io/4509027660595200",

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});