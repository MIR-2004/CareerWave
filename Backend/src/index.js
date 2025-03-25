import './config/instrument.js'
import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import * as Sentry from "@sentry/node"

const port = process.env.PORT || 3000;

Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

connectDB().then(
    app.on("error", (error) => {
        console.log("Error:", error);
        throw error;
      })
      .listen(port, () => {
        console.log(`Server is running successfully on port ${port}`);
      })
    
).catch((err) => {
    console.log("Mongodb connection error", err)
})